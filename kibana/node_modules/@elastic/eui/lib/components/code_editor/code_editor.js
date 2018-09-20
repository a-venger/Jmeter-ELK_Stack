'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiCodeEditor = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAce = require('react-ace');

var _reactAce2 = _interopRequireDefault(_reactAce);

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EuiCodeEditor = exports.EuiCodeEditor = function (_Component) {
  _inherits(EuiCodeEditor, _Component);

  function EuiCodeEditor() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EuiCodeEditor);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EuiCodeEditor.__proto__ || Object.getPrototypeOf(EuiCodeEditor)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EuiCodeEditor, [{
    key: 'stopEditing',
    value: function stopEditing() {
      this.setState({
        isHintActive: true,
        isEditing: false
      });
    }
  }, {
    key: 'isCustomMode',
    value: function isCustomMode() {
      return _typeof(this.props.mode) === 'object';
    }
  }, {
    key: 'setCustomMode',
    value: function setCustomMode() {
      this.aceEditor.editor.getSession().setMode(this.props.mode);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.isCustomMode()) {
        this.setCustomMode();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.mode !== prevProps.mode && this.isCustomMode()) {
        this.setCustomMode();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          width = _props.width,
          height = _props.height,
          onBlur = _props.onBlur,
          isReadOnly = _props.isReadOnly,
          setOptions = _props.setOptions,
          cursorStart = _props.cursorStart,
          rest = _objectWithoutProperties(_props, ['width', 'height', 'onBlur', 'isReadOnly', 'setOptions', 'cursorStart']);

      var classes = (0, _classnames2.default)('euiCodeEditorWrapper', {
        'euiCodeEditorWrapper-isEditing': this.state.isEditing
      });

      var promptClasses = (0, _classnames2.default)('euiCodeEditorKeyboardHint', {
        'euiCodeEditorKeyboardHint-isInactive': !this.state.isHintActive
      });

      var filteredCursorStart = void 0;

      var options = _extends({}, setOptions);

      if (isReadOnly) {
        // Put the cursor at the beginning of the editor, so that it doesn't look like
        // a prompt to begin typing.
        filteredCursorStart = -1;

        Object.assign(options, {
          readOnly: true,
          highlightActiveLine: false,
          highlightGutterLine: false
        });
      } else {
        filteredCursorStart = cursorStart;
      }

      var activity = isReadOnly ? 'interacting with the code' : 'editing';

      // Don't use EuiKeyboardAccessible here because it doesn't play nicely with onKeyDown.
      var prompt = _react2.default.createElement(
        'div',
        {
          className: promptClasses,
          id: this.idGenerator('codeEditor'),
          ref: function ref(hint) {
            _this2.editorHint = hint;
          },
          tabIndex: '0',
          role: 'button',
          onClick: this.startEditing,
          onKeyDown: this.onKeyDownHint,
          'data-test-subj': 'codeEditorHint'
        },
        _react2.default.createElement(
          'p',
          { className: 'euiText' },
          'Press Enter to start ',
          activity,
          '.'
        ),
        _react2.default.createElement(
          'p',
          { className: 'euiText' },
          'When you\u2019re done, press Escape to stop ',
          activity,
          '.'
        )
      );

      if (this.isCustomMode()) {
        delete rest.mode; // Otherwise, the AceEditor component will complain about wanting a string value for the mode prop.
      }

      return _react2.default.createElement(
        'div',
        {
          className: classes,
          style: { width: width, height: height },
          'data-test-subj': 'codeEditorContainer'
        },
        prompt,
        _react2.default.createElement(_reactAce2.default, _extends({
          ref: this.aceEditorRef,
          width: width,
          height: height,
          onFocus: this.onFocusAce,
          onBlur: this.onBlurAce,
          setOptions: options,
          editorProps: {
            $blockScrolling: Infinity
          },
          cursorStart: filteredCursorStart
        }, rest))
      );
    }
  }]);

  return EuiCodeEditor;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.state = {
    isHintActive: true,
    isEditing: false
  };
  this.idGenerator = (0, _services.htmlIdGenerator)();

  this.aceEditorRef = function (aceEditor) {
    if (aceEditor) {
      _this3.aceEditor = aceEditor;
      aceEditor.editor.textInput.getElement().tabIndex = -1;
      aceEditor.editor.textInput.getElement().addEventListener('keydown', _this3.onKeydownAce);
    }
  };

  this.onKeydownAce = function (ev) {
    if (ev.keyCode === _services.keyCodes.ESCAPE) {
      // If the autocompletion context menu is open then we want to let ESCAPE close it but
      // **not** exit out of editing mode.
      if (!_this3.aceEditor.editor.completer) {
        ev.preventDefault();
        ev.stopPropagation();
        _this3.stopEditing();
        _this3.editorHint.focus();
      }
    }
  };

  this.onFocusAce = function () {
    _this3.setState({
      isEditing: true
    });
    if (_this3.props.onFocus) {
      var _props2;

      (_props2 = _this3.props).onFocus.apply(_props2, arguments);
    }
  };

  this.onBlurAce = function () {
    _this3.stopEditing();
    if (_this3.props.onBlur) {
      var _props3;

      (_props3 = _this3.props).onBlur.apply(_props3, arguments);
    }
  };

  this.onKeyDownHint = function (ev) {
    if (ev.keyCode === _services.keyCodes.ENTER) {
      ev.preventDefault();
      _this3.startEditing();
    }
  };

  this.startEditing = function () {
    _this3.setState({
      isHintActive: false
    });
    _this3.aceEditor.editor.textInput.focus();
  };
};

EuiCodeEditor.propTypes = {
  width: _propTypes2.default.string,
  height: _propTypes2.default.string,
  onBlur: _propTypes2.default.func,
  isReadOnly: _propTypes2.default.bool,
  setOptions: _propTypes2.default.object,
  cursorStart: _propTypes2.default.number,

  /**
   * Use string for a built-in mode or object for a custom mode
   */
  mode: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
};

EuiCodeEditor.defaultProps = {
  setOptions: {}
};
EuiCodeEditor.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiCodeEditor',
  'methods': [{
    'name': 'aceEditorRef',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'aceEditor',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'onKeydownAce',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'ev',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'onFocusAce',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': '...args',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'onBlurAce',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': '...args',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'onKeyDownHint',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'ev',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'startEditing',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'stopEditing',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'isCustomMode',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'setCustomMode',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }],
  'props': {
    'width': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'height': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'onBlur': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'isReadOnly': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    },
    'setOptions': {
      'type': {
        'name': 'object'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '{}',
        'computed': false
      }
    },
    'cursorStart': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': ''
    },
    'mode': {
      'type': {
        'name': 'union',
        'value': [{
          'name': 'string'
        }, {
          'name': 'object'
        }]
      },
      'required': false,
      'description': 'Use string for a built-in mode or object for a custom mode'
    }
  }
}];