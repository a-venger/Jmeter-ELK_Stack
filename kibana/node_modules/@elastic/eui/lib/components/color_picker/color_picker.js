'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiColorPicker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactColor = require('react-color');

var _outside_click_detector = require('../outside_click_detector');

var _color_picker_swatch = require('./color_picker_swatch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EuiColorPicker = exports.EuiColorPicker = function (_Component) {
  _inherits(EuiColorPicker, _Component);

  function EuiColorPicker(props) {
    _classCallCheck(this, EuiColorPicker);

    var _this = _possibleConstructorReturn(this, (EuiColorPicker.__proto__ || Object.getPrototypeOf(EuiColorPicker)).call(this, props));

    _this.closeColorSelector = function () {
      _this.setState({ showColorSelector: false });
    };

    _this.toggleColorSelector = function () {
      _this.setState({ showColorSelector: !_this.state.showColorSelector });
    };

    _this.handleColorSelection = function (color) {
      _this.props.onChange(color.hex);
    };

    _this.state = {
      showColorSelector: false
    };
    return _this;
  }

  _createClass(EuiColorPicker, [{
    key: 'getColorLabel',
    value: function getColorLabel() {
      var color = this.props.color;

      var colorValue = color === null ? '(transparent)' : color;
      return _react2.default.createElement(
        'div',
        {
          className: 'euiColorPicker__label',
          'aria-label': 'Color selection is ' + colorValue
        },
        colorValue
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          color = _props.color,
          className = _props.className,
          showColorLabel = _props.showColorLabel;

      var classes = (0, _classnames2.default)('euiColorPicker', className);
      return _react2.default.createElement(
        _outside_click_detector.EuiOutsideClickDetector,
        { onOutsideClick: this.closeColorSelector },
        _react2.default.createElement(
          'div',
          {
            className: classes,
            'data-test-subj': this.props['data-test-subj']
          },
          _react2.default.createElement(
            'div',
            {
              className: 'euiColorPicker__preview',
              onClick: this.toggleColorSelector
            },
            _react2.default.createElement(_color_picker_swatch.EuiColorPickerSwatch, { color: color, 'aria-label': this.props['aria-label'] }),
            showColorLabel ? this.getColorLabel() : null
          ),
          this.state.showColorSelector ? _react2.default.createElement(
            'div',
            { className: 'euiColorPickerPopUp', 'data-test-subj': 'colorPickerPopup' },
            _react2.default.createElement(_reactColor.ChromePicker, {
              color: color ? color : '#ffffff',
              disableAlpha: true,
              onChange: this.handleColorSelection
            })
          ) : null
        )
      );
    }
  }]);

  return EuiColorPicker;
}(_react.Component);

EuiColorPicker.propTypes = {
  className: _propTypes2.default.string,
  color: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired,
  showColorLabel: _propTypes2.default.bool
};

EuiColorPicker.defaultProps = {
  'aria-label': 'Select a color',
  showColorLabel: true
};
EuiColorPicker.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiColorPicker',
  'methods': [{
    'name': 'closeColorSelector',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'toggleColorSelector',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'handleColorSelection',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'color',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'getColorLabel',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }],
  'props': {
    'className': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'color': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'onChange': {
      'type': {
        'name': 'func'
      },
      'required': true,
      'description': ''
    },
    'showColorLabel': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'true',
        'computed': false
      }
    },
    'aria-label': {
      'defaultValue': {
        'value': '\'Select a color\'',
        'computed': false
      }
    }
  }
}];