'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.astToEsQueryDsl = exports._isFlagToQuery = exports._fieldValuesToQuery = exports._termValuesToQuery = undefined;

var _date_format = require('./date_format');

var _date_value = require('./date_value');

var _ast = require('./ast');

var _predicate = require('../../../services/predicate');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var processDateOperation = function processDateOperation(value, operator) {
  var granularity = value.granularity,
      resolve = value.resolve;

  var expression = (0, _date_format.printIso8601)(resolve());
  if (!granularity) {
    return { operator: operator, expression: expression };
  }
  switch (operator) {
    case _ast.AST.Operator.GT:
      expression = expression + '||+1' + granularity.es + '/' + granularity.es;
      return { operator: _ast.AST.Operator.GTE, expression: expression };
    case _ast.AST.Operator.GTE:
      expression = expression + '||/' + granularity.es;
      return { operator: operator, expression: expression };
    case _ast.AST.Operator.LT:
      expression = expression + '||/' + granularity.es;
      return { operator: operator, expression: expression };
    case _ast.AST.Operator.LTE:
      expression = expression + '||+1' + granularity.es + '/' + granularity.es;
      return { operator: _ast.AST.Operator.LT, expression: expression };
    default:
      expression = expression + '||/' + granularity.es;
      return { expression: expression };
  }
};

var _termValuesToQuery = exports._termValuesToQuery = function _termValuesToQuery(values, options) {
  var body = {
    query: values.join(' ')
  };
  if (body.query === '') {
    return;
  }
  if (options.defaultFields) {
    body.fields = options.defaultFields;
  }
  return {
    'simple_query_string': body
  };
};

var _fieldValuesToQuery = exports._fieldValuesToQuery = function _fieldValuesToQuery(field, operations, andOr) {
  var queries = [];

  Object.keys(operations).forEach(function (operator) {
    var values = operations[operator];
    switch (operator) {

      case _ast.AST.Operator.EQ:
        var _values$reduce = values.reduce(function (tokenTypes, value) {
          if ((0, _date_value.isDateValue)(value)) {
            tokenTypes.dates.push(value);
          } else if ((0, _predicate.isDateLike)(value)) {
            tokenTypes.dates.push((0, _date_value.dateValue)(value));
          } else if ((0, _predicate.isString)(value) && value.match(/\s/)) {
            tokenTypes.phrases.push(value);
          } else {
            tokenTypes.terms.push(value);
          }
          return tokenTypes;
        }, { terms: [], phrases: [], dates: [] }),
            terms = _values$reduce.terms,
            phrases = _values$reduce.phrases,
            dates = _values$reduce.dates;

        if (terms.length > 0) {
          queries.push({
            match: _defineProperty({}, field, {
              query: terms.join(' '),
              operator: andOr
            })
          });
        }

        if (phrases.length > 0) {
          queries.push.apply(queries, _toConsumableArray(phrases.map(function (phrase) {
            return {
              match_phrase: _defineProperty({}, field, phrase)
            };
          })));
        }

        if (dates.length > 0) {
          queries.push.apply(queries, _toConsumableArray(dates.map(function (value) {
            return {
              match: _defineProperty({}, field, processDateOperation(value).expression)
            };
          })));
        }

        break;

      default:

        values.forEach(function (value) {
          if ((0, _date_value.isDateValue)(value)) {
            var operation = processDateOperation(value, operator);
            queries.push({
              range: _defineProperty({}, field, _defineProperty({}, operation.operator, operation.expression))
            });
          } else {
            queries.push({
              range: _defineProperty({}, field, _defineProperty({}, operator, value))
            });
          }
        });
    }
  });

  if (queries.length === 1) {
    return queries[0];
  }

  var key = andOr === 'and' ? 'must' : 'should';
  return {
    bool: _defineProperty({}, key, [].concat(queries))
  };
};

var _isFlagToQuery = exports._isFlagToQuery = function _isFlagToQuery(flag, on) {
  return {
    term: _defineProperty({}, flag, on)
  };
};

var collectTerms = function collectTerms(ast) {
  return ast.getTermClauses().reduce(function (values, clause) {
    if (_ast.AST.Match.isMustClause(clause)) {
      values.must.push(clause.value);
    } else {
      values.mustNot.push(clause.value);
    }
    return values;
  }, { must: [], mustNot: [] });
};

var collectFields = function collectFields(ast) {

  var fieldArray = function fieldArray(obj, field, operator) {
    if (!obj[field]) {
      obj[field] = {};
    }
    if (!obj[field][operator]) {
      obj[field][operator] = [];
    }
    return obj[field][operator];
  };

  return ast.getFieldClauses().reduce(function (fields, clause) {
    if (_ast.AST.Match.isMustClause(clause)) {
      if ((0, _predicate.isArray)(clause.value)) {
        var _fieldArray;

        (_fieldArray = fieldArray(fields.must.or, clause.field, clause.operator)).push.apply(_fieldArray, _toConsumableArray(clause.value));
      } else {
        fieldArray(fields.must.and, clause.field, clause.operator).push(clause.value);
      }
    } else {
      if ((0, _predicate.isArray)(clause.value)) {
        var _fieldArray2;

        (_fieldArray2 = fieldArray(fields.mustNot.or, clause.field, clause.operator)).push.apply(_fieldArray2, _toConsumableArray(clause.value));
      } else {
        fieldArray(fields.mustNot.and, clause.field, clause.operator).push(clause.value);
      }
    }
    return fields;
  }, {
    must: { and: {}, or: {} },
    mustNot: { and: {}, or: {} }
  });
};

var astToEsQueryDsl = exports.astToEsQueryDsl = function astToEsQueryDsl(ast) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  if (ast.clauses.length === 0) {
    return { match_all: {} };
  }

  var extraMustQueries = options.extraMustQueries || [];
  var extraMustNotQueries = options.extraMustNotQueries || [];
  var termValuesToQuery = options.termValuesToQuery || _termValuesToQuery;
  var fieldValuesToQuery = options.fieldValuesToQuery || _fieldValuesToQuery;
  var isFlagToQuery = options.isFlagToQuery || _isFlagToQuery;

  var terms = collectTerms(ast);
  var fields = collectFields(ast);

  var must = [];
  must.push.apply(must, _toConsumableArray(extraMustQueries));
  var termMustQuery = termValuesToQuery(terms.must, options);
  if (termMustQuery) {
    must.push(termMustQuery);
  }
  Object.keys(fields.must.and).forEach(function (field) {
    must.push(fieldValuesToQuery(field, fields.must.and[field], 'and'));
  });
  Object.keys(fields.must.or).forEach(function (field) {
    must.push(fieldValuesToQuery(field, fields.must.or[field], 'or'));
  });
  ast.getIsClauses().forEach(function (clause) {
    must.push(isFlagToQuery(clause.flag, _ast.AST.Match.isMustClause(clause)));
  });

  var mustNot = [];
  mustNot.push.apply(mustNot, _toConsumableArray(extraMustNotQueries));
  var termMustNotQuery = termValuesToQuery(terms.mustNot, options);
  if (termMustNotQuery) {
    mustNot.push(termMustNotQuery);
  }
  Object.keys(fields.mustNot.and).forEach(function (field) {
    mustNot.push(fieldValuesToQuery(field, fields.mustNot.and[field], 'and'));
  });
  Object.keys(fields.mustNot.or).forEach(function (field) {
    mustNot.push(fieldValuesToQuery(field, fields.mustNot.or[field], 'or'));
  });

  var bool = {};
  if (must.length !== 0) {
    bool.must = must;
  }
  if (mustNot.length !== 0) {
    bool.must_not = mustNot;
  }
  return { bool: bool };
};