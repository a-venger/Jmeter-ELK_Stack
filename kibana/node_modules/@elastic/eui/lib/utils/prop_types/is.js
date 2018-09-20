'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.is = undefined;

var _predicate = require('../../services/predicate');

var is = exports.is = function is(expectedValue) {

  var validator = function validator(props, propName, componentName) {
    var compName = componentName || 'ANONYMOUS';
    var value = props[propName];
    if (value !== expectedValue) {
      return new Error('[' + propName + '] property in [' + compName + '] component is expected to equal [' + expectedValue + '] but \n         [' + value + '] was provided instead.');
    }
    return null;
  };

  validator.isRequired = function (props, propName, componentName) {
    var compName = componentName || 'ANONYMOUS';
    var value = props[propName];
    if ((0, _predicate.isNil)(value)) {
      return new Error('[' + propName + '] property in [' + compName + '] component is required but seems to be missing');
    }
    return validator(props, propName, componentName);
  };

  return validator;
};