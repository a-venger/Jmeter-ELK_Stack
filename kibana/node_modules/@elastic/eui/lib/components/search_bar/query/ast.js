'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AST = exports._AST = exports.Operator = exports.Match = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _predicate = require('../../../services/predicate');

var _date_value = require('./date_value');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Match = exports.Match = Object.freeze({
  MUST: 'must',
  MUST_NOT: 'must_not',
  isMust: function isMust(match) {
    return match === Match.MUST;
  },
  isMustClause: function isMustClause(clause) {
    return Match.isMust(clause.match);
  }
});

var Operator = exports.Operator = Object.freeze({
  EQ: 'eq',
  GT: 'gt',
  GTE: 'gte',
  LT: 'lt',
  LTE: 'lte',
  isEQ: function isEQ(match) {
    return match === Operator.EQ;
  },
  isEQClause: function isEQClause(clause) {
    return Operator.isEQ(clause.operator);
  },
  isRange: function isRange(match) {
    return Operator.isGT(match) || Operator.isGTE(match) || Operator.isLT(match) || Operator.isLTE(match);
  },
  isRangeClause: function isRangeClause(clause) {
    return Operator.isRange(clause.operator);
  },
  isGT: function isGT(match) {
    return match === Operator.GT;
  },
  isGTClause: function isGTClause(clause) {
    return Operator.isGT(clause.operator);
  },
  isGTE: function isGTE(match) {
    return match === Operator.GTE;
  },
  isGTEClause: function isGTEClause(clause) {
    return Operator.isGTE(clause.operator);
  },
  isLT: function isLT(match) {
    return match === Operator.LT;
  },
  isLTClause: function isLTClause(clause) {
    return Operator.isLT(clause.operator);
  },
  isLTE: function isLTE(match) {
    return match === Operator.LTE;
  },
  isLTEClause: function isLTEClause(clause) {
    return Operator.isLTE(clause.operator);
  }
});

var Term = Object.freeze({
  TYPE: 'term',
  isInstance: function isInstance(clause) {
    return clause.type === Term.TYPE;
  },
  must: function must(value) {
    return { type: Term.TYPE, value: value, match: Match.MUST };
  },
  mustNot: function mustNot(value) {
    return { type: Term.TYPE, value: value, match: Match.MUST_NOT };
  }
});

var Field = Object.freeze({
  TYPE: 'field',
  isInstance: function isInstance(clause) {
    return clause.type === Field.TYPE;
  },
  must: {
    eq: function eq(field, value) {
      return { type: Field.TYPE, field: field, value: value, match: Match.MUST, operator: Operator.EQ };
    },
    gt: function gt(field, value) {
      return { type: Field.TYPE, field: field, value: value, match: Match.MUST, operator: Operator.GT };
    },
    gte: function gte(field, value) {
      return { type: Field.TYPE, field: field, value: value, match: Match.MUST, operator: Operator.GTE };
    },
    lt: function lt(field, value) {
      return { type: Field.TYPE, field: field, value: value, match: Match.MUST, operator: Operator.LT };
    },
    lte: function lte(field, value) {
      return { type: Field.TYPE, field: field, value: value, match: Match.MUST, operator: Operator.LTE };
    }
  },
  mustNot: {
    eq: function eq(field, value) {
      return { type: Field.TYPE, field: field, value: value, match: Match.MUST_NOT, operator: Operator.EQ };
    },
    gt: function gt(field, value) {
      return { type: Field.TYPE, field: field, value: value, match: Match.MUST_NOT, operator: Operator.GT };
    },
    gte: function gte(field, value) {
      return { type: Field.TYPE, field: field, value: value, match: Match.MUST_NOT, operator: Operator.GTE };
    },
    lt: function lt(field, value) {
      return { type: Field.TYPE, field: field, value: value, match: Match.MUST_NOT, operator: Operator.LT };
    },
    lte: function lte(field, value) {
      return { type: Field.TYPE, field: field, value: value, match: Match.MUST_NOT, operator: Operator.LTE };
    }
  }
});

var Is = Object.freeze({
  TYPE: 'is',
  isInstance: function isInstance(clause) {
    return clause.type === Is.TYPE;
  },
  must: function must(flag) {
    return { type: Is.TYPE, flag: flag, match: Match.MUST };
  },
  mustNot: function mustNot(flag) {
    return { type: Is.TYPE, flag: flag, match: Match.MUST_NOT };
  }
});

var valuesEqual = function valuesEqual(v1, v2) {
  if ((0, _date_value.isDateValue)(v1)) {
    return (0, _date_value.dateValuesEqual)(v1, v2);
  }
  return v1 === v2;
};

var arrayIncludesValue = function arrayIncludesValue(array, value) {
  return array.some(function (item) {
    return valuesEqual(item, value);
  });
};

/**
 * The AST structure is an array of clauses. There are 3 types of clauses that are supported:
 *
 * :term:
 * Holds a VALUE and an OCCUR. The OCCUR indicates whether the value must match or must not match. Default
 * clauses are not associated with any specific field - when executing the search, one can specify what are
 * the default fields that the default clauses will be matched against.
 *
 * :field:
 * Like the `term` clause, holds a VALUE and an MATCH, but this clause also specifies the field that the
 * value will be matched against.
 *
 * :is:
 * Holds a FLAG and indicates whether this flag must be applied or must not be applied. Typically this clause
 * matches against boolean values of a record (e.g. "is:online", "is:internal", "is:on", etc..)
 *
 * This AST is immutable - every "mutating" operation returns a newly mutated AST.
 */

var _AST = exports._AST = function () {
  _createClass(_AST, null, [{
    key: 'create',
    value: function create(clauses) {
      return new _AST(clauses);
    }
  }]);

  function _AST() {
    var clauses = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, _AST);

    this._clauses = clauses;
    this._indexedClauses = clauses.reduce(function (map, clause) {
      switch (clause.type) {
        case Field.TYPE:
          if (!map.field[clause.field]) {
            map.field[clause.field] = [];
          }
          map.field[clause.field].push(clause);
          return map;
        case Is.TYPE:
          map.is[clause.flag] = clause;
          return map;
        case Term.TYPE:
          map.term.push(clause);
          return map;
        default:
          throw new Error('Unknown query clause type [' + clause.type + ']');
      }
    }, { field: {}, is: {}, term: [] });
  }

  _createClass(_AST, [{
    key: 'getTermClauses',
    value: function getTermClauses() {
      return this._indexedClauses.term;
    }
  }, {
    key: 'getTermClause',
    value: function getTermClause(value) {
      var clauses = this.getTermClauses();
      return clauses.find(function (clause) {
        return valuesEqual(clause.value, value);
      });
    }
  }, {
    key: 'getFieldNames',
    value: function getFieldNames() {
      return Object.keys(this._indexedClauses.field);
    }
  }, {
    key: 'getFieldClauses',
    value: function getFieldClauses() {
      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      return field ? this._indexedClauses.field[field] : this._clauses.filter(Field.isInstance);
    }
  }, {
    key: 'getFieldClause',
    value: function getFieldClause(field, predicate) {
      var clauses = this.getFieldClauses(field);
      if (clauses) {
        return clauses.find(predicate);
      }
    }
  }, {
    key: 'hasOrFieldClause',
    value: function hasOrFieldClause(field) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      var clauses = this.getFieldClause(field, function (clause) {
        return (0, _predicate.isArray)(clause.value);
      });
      if (!clauses) {
        return false;
      }
      return (0, _predicate.isNil)(value) || clauses.some(function (clause) {
        return arrayIncludesValue(clause.value, value);
      });
    }
  }, {
    key: 'getOrFieldClause',
    value: function getOrFieldClause(field) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      return this.getFieldClause(field, function (clause) {
        return (0, _predicate.isArray)(clause.value) && ((0, _predicate.isNil)(value) || arrayIncludesValue(clause.value, value));
      });
    }
  }, {
    key: 'addOrFieldValue',
    value: function addOrFieldValue(field, value) {
      var must = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var operator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Operator.EQ;

      var existingClause = this.getOrFieldClause(field);
      if (!existingClause) {
        var newClause = must ? Field.must[operator](field, [value]) : Field.mustNot[operator](field, [value]);
        return new _AST([].concat(_toConsumableArray(this._clauses), [newClause]));
      }
      var clauses = this._clauses.map(function (clause) {
        if (clause === existingClause) {
          clause.value.push(value);
        }
        return clause;
      });
      return new _AST(clauses);
    }
  }, {
    key: 'removeOrFieldValue',
    value: function removeOrFieldValue(field, value) {
      var existingClause = this.getOrFieldClause(field, value);
      if (!existingClause) {
        return new _AST([].concat(_toConsumableArray(this._clauses)));
      }
      var clauses = this._clauses.reduce(function (clauses, clause) {
        if (clause !== existingClause) {
          clauses.push(clause);
          return clauses;
        }
        var filteredValue = clause.value.filter(function (val) {
          return !valuesEqual(val, value);
        });
        if (filteredValue.length === 0) {
          return clauses;
        }
        clauses.push(_extends({}, clause, { value: filteredValue }));
        return clauses;
      }, []);
      return new _AST(clauses);
    }
  }, {
    key: 'removeOrFieldClauses',
    value: function removeOrFieldClauses(field) {
      var clauses = this._clauses.filter(function (clause) {
        return !Field.isInstance(clause) || clause.field !== field || !(0, _predicate.isArray)(clause.value);
      });
      return new _AST(clauses);
    }
  }, {
    key: 'hasSimpleFieldClause',
    value: function hasSimpleFieldClause(field) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      var clauses = this.getFieldClause(field, function (clause) {
        return !(0, _predicate.isArray)(clause.value);
      });
      if (!clauses) {
        return false;
      }
      return (0, _predicate.isNil)(value) || clauses.some(function (clause) {
        return valuesEqual(clause.value, value);
      });
    }
  }, {
    key: 'getSimpleFieldClause',
    value: function getSimpleFieldClause(field) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      return this.getFieldClause(field, function (clause) {
        return !(0, _predicate.isArray)(clause.value) && ((0, _predicate.isNil)(value) || valuesEqual(clause.value, value));
      });
    }
  }, {
    key: 'addSimpleFieldValue',
    value: function addSimpleFieldValue(field, value) {
      var must = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var operator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Operator.EQ;

      var clause = must ? Field.must[operator](field, value) : Field.mustNot[operator](field, value);
      return this.addClause(clause);
    }
  }, {
    key: 'removeSimpleFieldValue',
    value: function removeSimpleFieldValue(field, value) {
      var existingClause = this.getSimpleFieldClause(field, value);
      if (!existingClause) {
        return new _AST([].concat(_toConsumableArray(this._clauses)));
      }
      var clauses = this._clauses.filter(function (clause) {
        return clause !== existingClause;
      });
      return new _AST(clauses);
    }
  }, {
    key: 'removeSimpleFieldClauses',
    value: function removeSimpleFieldClauses(field) {
      var clauses = this._clauses.filter(function (clause) {
        return !Field.isInstance(clause) || clause.field !== field || (0, _predicate.isArray)(clause.value);
      });
      return new _AST(clauses);
    }
  }, {
    key: 'getIsClauses',
    value: function getIsClauses() {
      return Object.values(this._indexedClauses.is);
    }
  }, {
    key: 'getIsClause',
    value: function getIsClause(flag) {
      return this._indexedClauses.is[flag];
    }
  }, {
    key: 'removeIsClause',
    value: function removeIsClause(flag) {
      return new _AST(this._clauses.filter(function (clause) {
        return !Is.isInstance(clause) || clause.flag !== flag;
      }));
    }

    /**
     * Creates and returns a new AST with the given clause added to the current clauses. If
     * the current clauses already include a similar clause, it will be (in-place) replaced by
     * the given clause. Whether a clause is similar to the given one depends on the type of the clause.
     * Two clauses are similar if:
     *
     * - they are both of the same type
     * - if they are `default` clauses, they must have the same value
     * - if they are `term` clauses, they must have the same fields and values
     * - if they are `is` clauses, they must have the same flags
     *
     * The reasoning behind not including the `match` attributes of the clauses in the rules above, stems
     * in the fact that the AST clauses are ANDed, and having two similar clauses with two different
     * match attributes creates a logically contradicted AST (e.g. what does it mean to
     * "(must have x) AND (must not have x)"?)
     *
     * note:  in-place replacement means the given clause will be placed in the same position as the one it
     *        replaced
     */

  }, {
    key: 'addClause',
    value: function addClause(newClause) {
      var added = false;
      var newClauses = this._clauses.reduce(function (clauses, clause) {
        if (newClause.type !== clause.type) {
          clauses.push(clause);
          return clauses;
        }
        switch (newClause.type) {
          case Term.TYPE:
            if (newClause.value !== clause.value) {
              clauses.push(clause);
              return clauses;
            }
            break;
          case Field.TYPE:
            if (newClause.field !== clause.field || newClause.value !== clause.value) {
              clauses.push(clause);
              return clauses;
            }
            break;
          case Is.TYPE:
            if (newClause.flag !== clause.flag) {
              clauses.push(clause);
              return clauses;
            }
            break;
          default:
            throw new Error('unknown clause type [' + newClause.type + ']');
        }
        added = true;
        clauses.push(newClause);
        return clauses;
      }, []);
      if (!added) {
        newClauses.push(newClause);
      }
      return new _AST(newClauses);
    }
  }, {
    key: 'clauses',
    get: function get() {
      return this._clauses;
    }
  }]);

  return _AST;
}();

var AST = exports.AST = Object.freeze({
  Match: Match,
  Operator: Operator,
  Term: Term,
  Field: Field,
  Is: Is,
  create: function create(clauses) {
    return new _AST(clauses);
  }
});