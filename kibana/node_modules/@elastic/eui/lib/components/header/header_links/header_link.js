'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiHeaderLink = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('../../button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiHeaderLink = function EuiHeaderLink(_ref) {
  var href = _ref.href,
      onClick = _ref.onClick,
      iconType = _ref.iconType,
      isActive = _ref.isActive,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['href', 'onClick', 'iconType', 'isActive', 'children', 'className']);

  var classes = (0, _classnames2.default)('euiHeaderLink', className);

  return _react2.default.createElement(
    _button.EuiButtonEmpty,
    _extends({
      className: classes,
      href: href,
      onClick: onClick,
      iconType: iconType,
      color: isActive ? 'primary' : 'text'
    }, rest),
    children
  );
};

exports.EuiHeaderLink = EuiHeaderLink;
EuiHeaderLink.propTypes = {
  href: _propTypes2.default.string,
  children: _propTypes2.default.node,
  isActive: _propTypes2.default.bool
};
EuiHeaderLink.__docgenInfo = [{
  'description': '',
  'methods': [],
  'props': {
    'href': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'children': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': ''
    },
    'isActive': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    }
  }
}];