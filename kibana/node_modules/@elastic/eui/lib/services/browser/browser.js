"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Browser = exports.Browser = Object.freeze({

  isEventSupported: function isEventSupported(name, element) {
    return "on" + name in element;
  }

});