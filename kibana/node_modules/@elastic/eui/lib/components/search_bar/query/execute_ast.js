'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeAst = exports.createFilter = undefined;

var _nameToOperatorMap;

var _lodash = require('lodash');

var _predicate = require('../../../services/predicate');

var _operators = require('./operators');

var _ast = require('./ast');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EXPLAIN_FIELD = '__explain';

var nameToOperatorMap = (_nameToOperatorMap = {}, _defineProperty(_nameToOperatorMap, _ast.AST.Operator.EQ, _operators.eq), _defineProperty(_nameToOperatorMap, _ast.AST.Operator.GT, _operators.gt), _defineProperty(_nameToOperatorMap, _ast.AST.Operator.GTE, _operators.gte), _defineProperty(_nameToOperatorMap, _ast.AST.Operator.LT, _operators.lt), _defineProperty(_nameToOperatorMap, _ast.AST.Operator.LTE, _operators.lte), _nameToOperatorMap);

var defaultIsClauseMatcher = function defaultIsClauseMatcher(item, clause, explain) {
  var type = clause.type,
      flag = clause.flag,
      match = clause.match;

  var value = (0, _lodash.get)(item, clause.flag);
  var must = _ast.AST.Match.isMustClause(clause);
  var hit = !!value === must;
  if (explain && hit) {
    explain.push({ hit: hit, type: type, flag: flag, match: match });
  }
  return hit;
};

var fieldClauseMatcher = function fieldClauseMatcher(item, field) {
  var clauses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var explain = arguments[3];

  return clauses.every(function (clause) {
    var type = clause.type,
        value = clause.value,
        match = clause.match;

    var operator = nameToOperatorMap[clause.operator];
    if (!operator) {
      // unknown matcher
      return true;
    }
    if (!_ast.AST.Match.isMust(match)) {
      operator = function operator(value, token) {
        return !nameToOperatorMap[clause.operator](value, token);
      };
    }
    var itemValue = (0, _lodash.get)(item, field);
    var hit = (0, _predicate.isArray)(value) ? value.some(function (v) {
      return operator(itemValue, v);
    }) : operator(itemValue, value);
    if (explain && hit) {
      explain.push({ hit: hit, type: type, field: field, value: value, match: match, operator: operator });
    }
    return hit;
  });
};

var extractStringFieldsFromItem = function extractStringFieldsFromItem(item) {
  return Object.keys(item).reduce(function (fields, key) {
    if ((0, _predicate.isString)(item[key])) {
      fields.push(key);
    }
    return fields;
  }, []);
};

var termClauseMatcher = function termClauseMatcher(item, fields) {
  var clauses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var explain = arguments[3];

  var searchableFields = fields || extractStringFieldsFromItem(item);
  return clauses.every(function (clause) {
    var type = clause.type,
        value = clause.value,
        match = clause.match;

    var isMustClause = _ast.AST.Match.isMustClause(clause);
    var equals = nameToOperatorMap[_ast.AST.Operator.EQ];

    var containsMatches = searchableFields.some(function (field) {
      var itemValue = (0, _lodash.get)(item, field);
      var isMatch = equals(itemValue, value);

      if (explain) {
        // If testing for the presence of a term, then we record a match as a match.
        // If testing for the absence of a term, then we invert this logic: we record a
        // non-match as a match.
        var hit = isMustClause && isMatch || !isMustClause && !isMatch;
        if (hit) {
          explain.push({ hit: hit, type: type, field: field, match: match, value: value });
        }
      }

      return isMatch;
    });

    if (isMustClause) {
      // If we're testing for the presence of a term, then we only need 1 field to match.
      return containsMatches;
    }

    // If we're testing for the absence of a term, we can't have any matching fields at all.
    return !containsMatches;
  });
};

var createFilter = exports.createFilter = function createFilter(ast, defaultFields) {
  var isClauseMatcher = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIsClauseMatcher;
  var explain = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  // Return items which pass ALL conditions: matches the terms entered, the specified field values,
  // and the specified "is" clauses.
  return function (item) {
    var explainLines = explain ? [] : undefined;

    if (explainLines) {
      item[EXPLAIN_FIELD] = explainLines;
    }

    var termClauses = ast.getTermClauses();
    var fields = ast.getFieldNames();
    var isClauses = ast.getIsClauses();

    var isTermMatch = termClauseMatcher(item, defaultFields, termClauses, explainLines);
    if (!isTermMatch) {
      return false;
    }

    var isFieldsMatch = fields.every(function (field) {
      return fieldClauseMatcher(item, field, ast.getFieldClauses(field), explainLines);
    });
    if (!isFieldsMatch) {
      return false;
    }

    var isIsMatch = isClauses.every(function (clause) {
      return isClauseMatcher(item, clause, explainLines);
    });
    if (!isIsMatch) {
      return false;
    }

    return true;
  };
};

var executeAst = exports.executeAst = function executeAst(ast, items) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var isClauseMatcher = options.isClauseMatcher,
      defaultFields = options.defaultFields,
      explain = options.explain;

  var filter = createFilter(ast, defaultFields, isClauseMatcher, explain);
  return items.filter(filter);
};