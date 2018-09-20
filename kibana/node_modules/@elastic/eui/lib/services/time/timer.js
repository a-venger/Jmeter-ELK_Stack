"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timer = exports.Timer = function Timer(callback, timeMs) {
  var _this = this;

  _classCallCheck(this, Timer);

  this.pause = function () {
    clearTimeout(_this.id);
    _this.id = undefined;
    _this.timeRemaining = _this.finishTime - Date.now();
  };

  this.resume = function () {
    _this.id = setTimeout(_this.finish, _this.timeRemaining);
    _this.finishTime = Date.now() + _this.timeRemaining;
    _this.timeRemaining = undefined;
  };

  this.clear = function () {
    clearTimeout(_this.id);
    _this.id = undefined;
    _this.callback = undefined;
    _this.finishTime = undefined;
    _this.timeRemaining = undefined;
  };

  this.finish = function () {
    if (_this.callback) {
      _this.callback();
    }
    _this.clear();
  };

  this.id = setTimeout(this.finish, timeMs);
  this.callback = callback;
  this.finishTime = Date.now() + timeMs;
  this.timeRemaining = undefined;
};