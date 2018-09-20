'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFormControlLayoutIcons = exports.ICON_SIDES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _loading = require('../../loading');

var _form_control_layout_clear_button = require('./form_control_layout_clear_button');

var _form_control_layout_custom_icon = require('./form_control_layout_custom_icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ICON_SIDES = exports.ICON_SIDES = ['left', 'right'];

var EuiFormControlLayoutIcons = exports.EuiFormControlLayoutIcons = function (_Component) {
  _inherits(EuiFormControlLayoutIcons, _Component);

  function EuiFormControlLayoutIcons() {
    _classCallCheck(this, EuiFormControlLayoutIcons);

    return _possibleConstructorReturn(this, (EuiFormControlLayoutIcons.__proto__ || Object.getPrototypeOf(EuiFormControlLayoutIcons)).apply(this, arguments));
  }

  _createClass(EuiFormControlLayoutIcons, [{
    key: 'render',
    value: function render() {
      var icon = this.props.icon;


      var iconSide = icon && icon.side ? icon.side : 'left';
      var customIcon = this.renderCustomIcon();
      var loadingSpinner = this.renderLoadingSpinner();
      var clearButton = this.renderClearButton();

      var leftIcons = void 0;

      if (customIcon && iconSide === 'left') {
        leftIcons = _react2.default.createElement(
          'div',
          { className: 'euiFormControlLayoutIcons' },
          customIcon
        );
      }

      var rightIcons = void 0;

      // If the icon is on the right, it should be placed after the clear button in the DOM.
      if (clearButton || loadingSpinner || customIcon && iconSide === 'right') {
        rightIcons = _react2.default.createElement(
          'div',
          { className: 'euiFormControlLayoutIcons euiFormControlLayoutIcons--right' },
          clearButton,
          loadingSpinner,
          iconSide === 'right' ? customIcon : undefined
        );
      }

      return _react2.default.createElement(
        _react.Fragment,
        null,
        leftIcons,
        rightIcons
      );
    }
  }, {
    key: 'renderCustomIcon',
    value: function renderCustomIcon() {
      var icon = this.props.icon;


      if (!icon) {
        return null;
      }

      // Normalize the icon to an object if it's a string.
      var iconProps = typeof icon === 'string' ? {
        type: icon
      } : icon;

      var iconRef = iconProps.ref,
          side = iconProps.side,
          iconRest = _objectWithoutProperties(iconProps, ['ref', 'side']);

      return _react2.default.createElement(_form_control_layout_custom_icon.EuiFormControlLayoutCustomIcon, _extends({
        iconRef: iconRef
      }, iconRest));
    }
  }, {
    key: 'renderLoadingSpinner',
    value: function renderLoadingSpinner() {
      var isLoading = this.props.isLoading;


      if (!isLoading) {
        return null;
      }

      return _react2.default.createElement(_loading.EuiLoadingSpinner, { size: 'm' });
    }
  }, {
    key: 'renderClearButton',
    value: function renderClearButton() {
      var clear = this.props.clear;


      if (!clear) {
        return null;
      }

      return _react2.default.createElement(_form_control_layout_clear_button.EuiFormControlLayoutClearButton, clear);
    }
  }]);

  return EuiFormControlLayoutIcons;
}(_react.Component);

EuiFormControlLayoutIcons.propTypes = {
  icon: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    type: _propTypes2.default.string,
    side: _propTypes2.default.oneOf(ICON_SIDES),
    onClick: _propTypes2.default.func
  })]),
  clear: _propTypes2.default.shape({
    onClick: _propTypes2.default.func
  }),
  isLoading: _propTypes2.default.bool
};
EuiFormControlLayoutIcons.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiFormControlLayoutIcons',
  'methods': [{
    'name': 'renderCustomIcon',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'renderLoadingSpinner',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'renderClearButton',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }],
  'props': {
    'icon': {
      'type': {
        'name': 'union',
        'value': [{
          'name': 'string'
        }, {
          'name': 'shape',
          'value': {
            'type': {
              'name': 'string',
              'required': false
            },
            'side': {
              'name': 'enum',
              'value': [{
                'value': '\'left\'',
                'computed': false
              }, {
                'value': '\'right\'',
                'computed': false
              }],
              'required': false
            },
            'onClick': {
              'name': 'func',
              'required': false
            }
          }
        }]
      },
      'required': false,
      'description': ''
    },
    'clear': {
      'type': {
        'name': 'shape',
        'value': {
          'onClick': {
            'name': 'func',
            'required': false
          }
        }
      },
      'required': false,
      'description': ''
    },
    'isLoading': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    }
  }
}];