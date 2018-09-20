'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * PropType validation that, if the property is present,
 * validates against a proptype and verifies that another property exists
 *
 * example:
 * ExampleComponent.propTypes = {
 *   items: PropTypes.array,
 *   itemId: withRequiredProp(PropTypes.string, 'items', 'itemId is required to extract the ID from an item')
 * }
 *
 * this validator warns if ExampleComponent is passed an `items` prop but not `itemId`
 */
var withRequiredProp = exports.withRequiredProp = function withRequiredProp(proptype, requiredPropName, messageDescription) {
  var validator = function validator() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var props = args[0],
        propName = args[1];

    // run the proptype for this property

    var result = proptype.apply(undefined, args);

    // if the property type checking passed then check for the required prop
    if (result == null) {
      // if this property was passed, check that the required property also exists
      if (props[propName] != null && props[requiredPropName] == null) {
        result = new Error('Property "' + propName + '" was passed without corresponding property "' + requiredPropName + '"' + (messageDescription ? '; ' + messageDescription : ''));
      }
    }

    return result;
  };

  return validator;
};