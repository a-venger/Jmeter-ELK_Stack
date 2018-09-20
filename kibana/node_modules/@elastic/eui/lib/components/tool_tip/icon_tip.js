'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiIconTip = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _icon = require('../icon');

var _tool_tip = require('./tool_tip');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiIconTip = function EuiIconTip(_ref) {
  var type = _ref.type,
      ariaLabel = _ref['aria-label'],
      color = _ref.color,
      size = _ref.size,
      rest = _objectWithoutProperties(_ref, ['type', 'aria-label', 'color', 'size']);

  return _react2.default.createElement(
    _tool_tip.EuiToolTip,
    rest,
    _react2.default.createElement(_icon.EuiIcon, { tabIndex: '0', type: type, color: color, size: size, 'aria-label': ariaLabel })
  );
};

exports.EuiIconTip = EuiIconTip;
EuiIconTip.propTypes = {
  /**
   * The icon type.
   */
  type: _propTypes2.default.string,

  /**
   * The icon color.
   */
  color: _propTypes2.default.string,

  /**
   * The icon size.
   */
  size: _propTypes2.default.string,

  /**
   * Explain what this icon means for screen readers.
   */
  'aria-label': _propTypes2.default.string
};

EuiIconTip.defaultProps = {
  type: 'questionInCircle',
  'aria-label': 'Info'
};
EuiIconTip.__docgenInfo = [{
  'description': '',
  'methods': [],
  'props': {
    'type': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'The icon type.',
      'defaultValue': {
        'value': '\'questionInCircle\'',
        'computed': false
      }
    },
    'color': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'The icon color.'
    },
    'size': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'The icon size.'
    },
    'aria-label': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Explain what this icon means for screen readers.',
      'defaultValue': {
        'value': '\'Info\'',
        'computed': false
      }
    }
  }
}];