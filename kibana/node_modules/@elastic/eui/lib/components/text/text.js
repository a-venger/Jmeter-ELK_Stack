'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiText = exports.TEXT_SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _text_color = require('./text_color');

var _text_align = require('./text_align');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var textSizeToClassNameMap = {
  s: 'euiText--small',
  xs: 'euiText--extraSmall'
};

var TEXT_SIZES = exports.TEXT_SIZES = Object.keys(textSizeToClassNameMap);

var EuiText = function EuiText(_ref) {
  var size = _ref.size,
      color = _ref.color,
      grow = _ref.grow,
      textAlign = _ref.textAlign,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['size', 'color', 'grow', 'textAlign', 'children', 'className']);

  var classes = (0, _classnames2.default)('euiText', textSizeToClassNameMap[size], className, {
    'euiText--constrainedWidth': !grow
  });

  var optionallyAlteredText = void 0;
  if (color) {
    optionallyAlteredText = _react2.default.createElement(
      _text_color.EuiTextColor,
      { color: color, component: 'div' },
      children
    );
  }

  if (textAlign) {
    optionallyAlteredText = _react2.default.createElement(
      _text_align.EuiTextAlign,
      { textAlign: textAlign },
      optionallyAlteredText || children
    );
  }

  return _react2.default.createElement(
    'div',
    _extends({ className: classes }, rest),
    optionallyAlteredText || children
  );
};

exports.EuiText = EuiText;
EuiText.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(TEXT_SIZES),
  color: _propTypes2.default.oneOf(_text_color.COLORS),
  textAlign: _propTypes2.default.oneOf(_text_align.ALIGNMENTS),
  grow: _propTypes2.default.bool
};

EuiText.defaultProps = {
  grow: true
};
EuiText.__docgenInfo = [{
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
    'size': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"s"',
          'computed': false
        }, {
          'value': '"xs"',
          'computed': false
        }]
      },
      'required': false,
      'description': ''
    },
    'color': {
      'type': {
        'name': 'enum',
        'computed': true,
        'value': 'COLORS'
      },
      'required': false,
      'description': ''
    },
    'textAlign': {
      'type': {
        'name': 'enum',
        'computed': true,
        'value': 'ALIGNMENTS'
      },
      'required': false,
      'description': ''
    },
    'grow': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'true',
        'computed': false
      }
    }
  }
}];