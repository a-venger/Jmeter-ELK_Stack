'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiPageContent = exports.HORIZONTAL_POSITIONS = exports.VERTICAL_POSITIONS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _panel = require('../../panel/panel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var verticalPositionToClassNameMap = {
  center: 'euiPageContent--verticalCenter'
};

var horizontalPositionToClassNameMap = {
  center: 'euiPageContent--horizontalCenter'
};

var VERTICAL_POSITIONS = exports.VERTICAL_POSITIONS = Object.keys(verticalPositionToClassNameMap);
var HORIZONTAL_POSITIONS = exports.HORIZONTAL_POSITIONS = Object.keys(horizontalPositionToClassNameMap);

var EuiPageContent = function EuiPageContent(_ref) {
  var verticalPosition = _ref.verticalPosition,
      horizontalPosition = _ref.horizontalPosition,
      panelPaddingSize = _ref.panelPaddingSize,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['verticalPosition', 'horizontalPosition', 'panelPaddingSize', 'children', 'className']);

  var classes = (0, _classnames2.default)('euiPageContent', className, verticalPositionToClassNameMap[verticalPosition], horizontalPositionToClassNameMap[horizontalPosition]);

  return _react2.default.createElement(
    _panel.EuiPanel,
    _extends({
      className: classes,
      paddingSize: panelPaddingSize
    }, rest),
    children
  );
};

exports.EuiPageContent = EuiPageContent;
EuiPageContent.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  panelPaddingSize: _propTypes2.default.oneOf(_panel.SIZES),
  verticalPosition: _propTypes2.default.oneOf(VERTICAL_POSITIONS),
  horizontalPosition: _propTypes2.default.oneOf(HORIZONTAL_POSITIONS)
};

EuiPageContent.defaultProps = {
  panelPaddingSize: 'l'
};
EuiPageContent.__docgenInfo = [{
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
    'panelPaddingSize': {
      'type': {
        'name': 'enum',
        'computed': true,
        'value': 'SIZES'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '\'l\'',
        'computed': false
      }
    },
    'verticalPosition': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"center"',
          'computed': false
        }]
      },
      'required': false,
      'description': ''
    },
    'horizontalPosition': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"center"',
          'computed': false
        }]
      },
      'required': false,
      'description': ''
    }
  }
}];