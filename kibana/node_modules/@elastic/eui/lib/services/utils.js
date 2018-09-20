'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

Object.defineProperty(exports, 'times', {
  enumerable: true,
  get: function get() {
    return _lodash.times;
  }
});
Object.defineProperty(exports, 'memoize', {
  enumerable: true,
  get: function get() {
    return _lodash.memoize;
  }
});
var browserTick = exports.browserTick = function browserTick(callback) {
  requestAnimationFrame(callback);
};