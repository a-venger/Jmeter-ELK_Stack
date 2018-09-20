'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiLink = exports.COLORS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var colorsToClassNameMap = {
  'primary': 'euiLink--primary',
  'subdued': 'euiLink--subdued',
  'secondary': 'euiLink--secondary',
  'accent': 'euiLink--accent',
  'danger': 'euiLink--danger',
  'warning': 'euiLink--warning',
  'ghost': 'euiLink--ghost'
};

var COLORS = exports.COLORS = Object.keys(colorsToClassNameMap);

var EuiLink = function EuiLink(_ref) {
  var children = _ref.children,
      color = _ref.color,
      className = _ref.className,
      href = _ref.href,
      target = _ref.target,
      rel = _ref.rel,
      type = _ref.type,
      onClick = _ref.onClick,
      rest = _objectWithoutProperties(_ref, ['children', 'color', 'className', 'href', 'target', 'rel', 'type', 'onClick']);

  var classes = (0, _classnames2.default)('euiLink', colorsToClassNameMap[color], className);

  if (href === undefined) {
    return _react2.default.createElement(
      'button',
      _extends({
        className: classes,
        type: type,
        onClick: onClick
      }, rest),
      children
    );
  }

  var secureRel = (0, _services.getSecureRelForTarget)(target, rel);

  return _react2.default.createElement(
    'a',
    _extends({
      className: classes,
      href: href,
      target: target,
      rel: secureRel,
      onClick: onClick
    }, rest),
    children
  );
};

exports.EuiLink = EuiLink;
EuiLink.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  href: _propTypes2.default.string,
  target: _propTypes2.default.string,
  rel: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  type: _propTypes2.default.string,
  color: _propTypes2.default.oneOf(COLORS)
};

EuiLink.defaultProps = {
  color: 'primary',
  type: 'button'
};
EuiLink.__docgenInfo = [{
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
    'href': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'target': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'rel': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'onClick': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'type': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '\'button\'',
        'computed': false
      }
    },
    'color': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"primary"',
          'computed': false
        }, {
          'value': '"subdued"',
          'computed': false
        }, {
          'value': '"secondary"',
          'computed': false
        }, {
          'value': '"accent"',
          'computed': false
        }, {
          'value': '"danger"',
          'computed': false
        }, {
          'value': '"warning"',
          'computed': false
        }, {
          'value': '"ghost"',
          'computed': false
        }]
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '\'primary\'',
        'computed': false
      }
    }
  }
}];