'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.astToEsQueryString = undefined;

var _date_format = require('./date_format');

var _date_value = require('./date_value');

var _ast = require('./ast');

var _predicate = require('../../../services/predicate');

var emitMatch = function emitMatch(match) {
  if (!match) {
    return '';
  }
  return _ast.AST.Match.isMust(match) ? '+' : '-';
};

var emitFieldDateLikeClause = function emitFieldDateLikeClause(field, value, operator, match) {
  var matchOp = emitMatch(match);
  switch (operator) {
    case _ast.Operator.EQ:
      return '' + matchOp + field + ':' + (0, _date_format.printIso8601)(value);
    case _ast.Operator.GT:
      return '' + matchOp + field + ':>' + (0, _date_format.printIso8601)(value);
    case _ast.Operator.GTE:
      return '' + matchOp + field + ':>=' + (0, _date_format.printIso8601)(value);
    case _ast.Operator.LT:
      return '' + matchOp + field + ':<' + (0, _date_format.printIso8601)(value);
    case _ast.Operator.LTE:
      return '' + matchOp + field + ':<=' + (0, _date_format.printIso8601)(value);
    default:
      throw new Error('unknown operator [' + operator + ']');
  }
};

var emitFieldDateValueClause = function emitFieldDateValueClause(field, value, operator, match) {
  var matchOp = emitMatch(match);
  var granularity = value.granularity,
      resolve = value.resolve;

  var date = resolve();
  if (granularity) {
    switch (operator) {
      case _ast.Operator.EQ:
        var gte = granularity.iso8601(granularity.start(date));
        var lt = granularity.iso8601(granularity.startOfNext(date));
        return '' + matchOp + field + ':(>=' + gte + ' AND <' + lt + ')';
      case _ast.Operator.GT:
        return '' + matchOp + field + ':>=' + granularity.iso8601(granularity.startOfNext(date));
      case _ast.Operator.GTE:
        return '' + matchOp + field + ':>=' + granularity.iso8601(granularity.start(date));
      case _ast.Operator.LT:
        return '' + matchOp + field + ':<' + granularity.iso8601(granularity.start(date));
      case _ast.Operator.LTE:
        return '' + matchOp + field + ':<' + granularity.iso8601(granularity.startOfNext(date));
      default:
        throw new Error('unknown operator [' + operator + ']');
    }
  }
  return emitFieldDateLikeClause(field, date, operator, match);
};

var emitFieldNumericClause = function emitFieldNumericClause(field, value, operator, match) {
  var matchOp = emitMatch(match);
  switch (operator) {
    case _ast.Operator.EQ:
      return '' + matchOp + field + ':' + value;
    case _ast.Operator.GT:
      return '' + matchOp + field + ':>' + value;
    case _ast.Operator.GTE:
      return '' + matchOp + field + ':>=' + value;
    case _ast.Operator.LT:
      return '' + matchOp + field + ':<' + value;
    case _ast.Operator.LTE:
      return '' + matchOp + field + ':<=' + value;
    default:
      throw new Error('unknown operator [' + operator + ']');
  }
};

var emitFieldStringClause = function emitFieldStringClause(field, value, match) {
  var matchOp = emitMatch(match);
  if (value.match(/\s/)) {
    return '' + matchOp + field + ':"' + value + '"';
  }
  return '' + matchOp + field + ':' + value;
};

var emitFieldBooleanClause = function emitFieldBooleanClause(field, value, match) {
  var matchOp = emitMatch(match);
  return '' + matchOp + field + ':' + value;
};

var emitFieldSingleValueClause = function emitFieldSingleValueClause(field, value, operator, match) {
  if ((0, _date_value.isDateValue)(value)) {
    return emitFieldDateValueClause(field, value, operator, match);
  }
  if ((0, _predicate.isDateLike)(value)) {
    return emitFieldDateLikeClause(field, value, operator, match);
  }
  if ((0, _predicate.isString)(value)) {
    return emitFieldStringClause(field, value, match);
  }
  if ((0, _predicate.isNumber)(value)) {
    return emitFieldNumericClause(field, value, operator, match);
  }
  if ((0, _predicate.isBoolean)(value)) {
    return emitFieldBooleanClause(field, value, match);
  }
  throw new Error('unknown type of field value [' + value + ']');
};

var emitFieldClause = function emitFieldClause(clause) {
  var field = clause.field,
      value = clause.value,
      operator = clause.operator,
      match = clause.match;

  if (!(0, _predicate.isArray)(value)) {
    return emitFieldSingleValueClause(field, value, operator, match);
  }
  var matchOp = emitMatch(match);
  var clauses = value.map(function (v) {
    return emitFieldSingleValueClause(field, v, operator);
  }).join(' OR ');
  return matchOp + '(' + clauses + ')';
};

var emitTermClause = function emitTermClause(clause) {
  var value = clause.value,
      match = clause.match;

  var matchOp = emitMatch(match);
  return '' + matchOp + value;
};

var emitIsClause = function emitIsClause(clause) {
  var flag = clause.flag,
      match = clause.match;

  return _ast.AST.Match.isMust(match) ? '+' + flag + ':true' : '+' + flag + ':false';
};

var astToEsQueryString = exports.astToEsQueryString = function astToEsQueryString(ast) {

  if (ast.clauses.length === 0) {
    return '';
  }

  return ast.clauses.map(function (clause) {
    if (_ast.AST.Field.isInstance(clause)) {
      return emitFieldClause(clause);
    }
    if (_ast.AST.Term.isInstance(clause)) {
      return emitTermClause(clause);
    }
    if (_ast.AST.Is.isInstance(clause)) {
      return emitIsClause(clause);
    }
    throw new Error('unknown clause type [' + JSON.stringify(clause) + ']');
  }).join(' ');
};