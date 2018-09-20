'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Random = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment2 = require('moment');

var _moment3 = _interopRequireDefault(_moment2);

var _predicate = require('./predicate');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultRand = Math.random;

var Random = exports.Random = function () {
  function Random() {
    var rand = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultRand;

    _classCallCheck(this, Random);

    this._rand = rand;
  }

  _createClass(Random, [{
    key: 'boolean',
    value: function boolean() {
      return this._rand() > 0.5;
    }
  }, {
    key: 'number',
    value: function number() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var min = (0, _predicate.isNil)(options.min) ? Number.MIN_VALUE : options.min;
      var max = (0, _predicate.isNil)(options.max) ? Number.MAX_VALUE : options.max;
      var delta = this._rand() * (max - min);
      return min + delta;
    }
  }, {
    key: 'integer',
    value: function integer() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var min = Math.ceil((0, _predicate.isNil)(options.min) ? Number.MIN_VALUE : options.min);
      var max = Math.floor((0, _predicate.isNil)(options.max) ? Number.MAX_VALUE : options.max);
      var delta = Math.floor(this._rand() * (max - min + 1));
      return min + delta;
    }
  }, {
    key: 'oneOf',
    value: function oneOf(values) {
      return values[Math.floor(this._rand() * values.length)];
    }
  }, {
    key: 'oneToOne',
    value: function oneToOne(values, index) {
      return values[index];
    }
  }, {
    key: 'setOf',
    value: function setOf(values, options) {
      var _this = this;

      var count = this.integer(_extends({ min: 0, max: values.length }, options));
      var copy = [].concat(_toConsumableArray(values));
      return (0, _utils.times)(count, function () {
        var value = _this.oneOf(copy);
        copy.splice(copy.indexOf(value), 1);
        return value;
      });
    }
  }, {
    key: 'date',
    value: function date() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var min = (0, _predicate.isNil)(options.min) ? new Date(0) : options.min;
      var max = (0, _predicate.isNil)(options.max) ? new Date(Date.now()) : options.max;
      var minMls = min.getTime();
      var maxMls = max.getTime();
      var time = this.integer({ min: minMls, max: maxMls });
      return new Date(time);
    }
  }, {
    key: 'moment',
    value: function moment() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var min = (0, _predicate.isNil)(options.min) ? (0, _moment3.default)(0) : options.min;
      var max = (0, _predicate.isNil)(options.max) ? (0, _moment3.default)() : options.max;
      var minMls = +min;
      var maxMls = +max;
      var time = this.integer({ min: minMls, max: maxMls });
      return (0, _moment3.default)(time);
    }
  }]);

  return Random;
}();