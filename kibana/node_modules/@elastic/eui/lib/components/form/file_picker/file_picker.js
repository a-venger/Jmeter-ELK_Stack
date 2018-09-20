'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFilePicker = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('../../button');

var _icon = require('../../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EuiFilePicker = exports.EuiFilePicker = function (_Component) {
  _inherits(EuiFilePicker, _Component);

  function EuiFilePicker(props) {
    _classCallCheck(this, EuiFilePicker);

    var _this = _possibleConstructorReturn(this, (EuiFilePicker.__proto__ || Object.getPrototypeOf(EuiFilePicker)).call(this, props));

    _this.handleChange = function () {
      if (_this.fileInput.files && _this.fileInput.files.length > 1) {
        _this.setState({ promptText: _this.fileInput.files.length + ' files selected' });
      } else if (_this.fileInput.files.length === 0) {
        _this.setState({ promptText: _this.props.initialPromptText });
      } else {
        _this.setState({ promptText: _this.fileInput.value.split('\\').pop() });
      }

      var onChange = _this.props.onChange;


      if (onChange) {
        onChange(_this.fileInput.files);
      }
    };

    _this.removeFiles = function (e) {
      e.stopPropagation();
      e.preventDefault();
      _this.fileInput.value = null;
      _this.handleChange();
    };

    _this.showDrop = function () {
      if (!_this.props.disabled) {
        _this.setState({ isHoveringDrop: true });
      }
    };

    _this.hideDrop = function () {
      _this.setState({ isHoveringDrop: false });
    };

    _this.state = {
      promptText: _this.props.initialPromptText,
      isHoveringDrop: false
    };
    return _this;
  }

  _createClass(EuiFilePicker, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          id = _props.id,
          name = _props.name,
          initialPromptText = _props.initialPromptText,
          className = _props.className,
          disabled = _props.disabled,
          compressed = _props.compressed,
          onChange = _props.onChange,
          rest = _objectWithoutProperties(_props, ['id', 'name', 'initialPromptText', 'className', 'disabled', 'compressed', 'onChange']);

      var classes = (0, _classnames2.default)('euiFilePicker', {
        'euiFilePicker__showDrop': this.state.isHoveringDrop,
        'euiFilePicker--compressed': compressed,
        'euiFilePicker-hasFiles': this.state.promptText !== initialPromptText
      }, className);

      var clearButton = void 0;
      if (this.state.promptText !== initialPromptText) {
        if (compressed) {
          clearButton = _react2.default.createElement(
            'button',
            {
              'aria-label': 'Clear selected files',
              className: 'euiFilePicker__clearButton',
              onClick: this.removeFiles
            },
            _react2.default.createElement(_icon.EuiIcon, {
              className: 'euiFilePicker__clearIcon',
              type: 'cross'
            })
          );
        } else {
          clearButton = _react2.default.createElement(
            _button.EuiButtonEmpty,
            {
              'aria-label': 'Clear selected files',
              className: 'euiFilePicker__clearButton',
              size: 'xs',
              onClick: this.removeFiles
            },
            'Remove'
          );
        }
      } else {
        clearButton = null;
      }

      return _react2.default.createElement(
        'div',
        {
          className: classes
        },
        _react2.default.createElement(
          'div',
          { className: 'euiFilePicker__wrap' },
          _react2.default.createElement('input', _extends({
            type: 'file',
            id: id,
            name: name,
            className: 'euiFilePicker__input',
            onChange: this.handleChange,
            ref: function ref(input) {
              _this2.fileInput = input;
            },
            onDragOver: this.showDrop,
            onDragLeave: this.hideDrop,
            onDrop: this.hideDrop,
            disabled: disabled
          }, rest)),
          _react2.default.createElement(
            'div',
            { className: 'euiFilePicker__prompt' },
            _react2.default.createElement(_icon.EuiIcon, {
              className: 'euiFilePicker__icon',
              type: 'importAction',
              size: compressed ? 'm' : 'l',
              'aria-hidden': 'true'
            }),
            _react2.default.createElement(
              'div',
              {
                className: 'euiFilePicker__promptText'
              },
              this.state.promptText
            ),
            clearButton
          )
        )
      );
    }
  }]);

  return EuiFilePicker;
}(_react.Component);

EuiFilePicker.propTypes = {
  id: _propTypes2.default.string,
  name: _propTypes2.default.string,
  className: _propTypes2.default.string,
  /**
   * The content that appears in the dropzone if no file is attached
   */
  initialPromptText: _propTypes2.default.node,
  /**
   * Use as a callback to access the HTML FileList API
   */
  onChange: _propTypes2.default.func,
  /**
   * Reduces the size to a typical (compressed) input
   */
  compressed: _propTypes2.default.bool
};
EuiFilePicker.defaultProps = {
  initialPromptText: 'Select or drag and drop a file',
  compressed: false
};
EuiFilePicker.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiFilePicker',
  'methods': [{
    'name': 'handleChange',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'removeFiles',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'e',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'showDrop',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'hideDrop',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }],
  'props': {
    'id': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'name': {
      'type': {
        'name': 'string'
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
    'initialPromptText': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': 'The content that appears in the dropzone if no file is attached',
      'defaultValue': {
        'value': '\'Select or drag and drop a file\'',
        'computed': false
      }
    },
    'onChange': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': 'Use as a callback to access the HTML FileList API'
    },
    'compressed': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Reduces the size to a typical (compressed) input',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    }
  }
}];