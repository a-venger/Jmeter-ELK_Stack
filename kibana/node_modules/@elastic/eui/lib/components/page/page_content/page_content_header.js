'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiPageContentHeader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiPageContentHeader = function EuiPageContentHeader(_ref) {
  var children = _ref.children,
      className = _ref.className,
      responsive = _ref.responsive,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'responsive']);

  var classes = (0, _classnames2.default)('euiPageContentHeader', {
    'euiPageContentHeader--responsive': responsive
  }, className);

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    children
  );
};

exports.EuiPageContentHeader = EuiPageContentHeader;
EuiPageContentHeader.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  /**
   * Set to false if you don't want the children to stack
   * at small screen sizes.
   */
  responsive: _propTypes2.default.bool
};

EuiPageContentHeader.defaultProps = {
  responsive: true
};
EuiPageContentHeader.__docgenInfo = [{
  'description': '',
  'methods': [],
  'props': {
    'children': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': ''
    },
    'className': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'responsive': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Set to false if you don\'t want the children to stack\nat small screen sizes.',
      'defaultValue': {
        'value': 'true',
        'computed': false
      }
    }
  }
}];