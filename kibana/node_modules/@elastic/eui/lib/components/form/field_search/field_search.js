'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFieldSearch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _browser = require('../../../services/browser');

var _key_codes = require('../../../services/key_codes');

var _form_control_layout = require('../form_control_layout');

var _validatable_control = require('../validatable_control');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  name: _propTypes2.default.string,
  id: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  value: _propTypes2.default.string,
  isInvalid: _propTypes2.default.bool,
  fullWidth: _propTypes2.default.bool,
  isLoading: _propTypes2.default.bool,
  inputRef: _propTypes2.default.func,
  onSearch: _propTypes2.default.func,
  /**
   * when `true` the search will be executed (that is, the `onSearch` will be called) as the
   * user types.
   */
  incremental: _propTypes2.default.bool,
  /**
   * when `true` creates a shorter height input
   */
  compressed: _propTypes2.default.bool
};

var defaultProps = {
  fullWidth: false,
  isLoading: false,
  incremental: false,
  compressed: false
};

var EuiFieldSearch = exports.EuiFieldSearch = function (_Component) {
  _inherits(EuiFieldSearch, _Component);

  function EuiFieldSearch(props) {
    _classCallCheck(this, EuiFieldSearch);

    var _this = _possibleConstructorReturn(this, (EuiFieldSearch.__proto__ || Object.getPrototypeOf(EuiFieldSearch)).call(this, props));

    _this.setRef = function (inputElement) {
      _this.inputElement = inputElement;
      if (_this.props.inputRef) {
        _this.props.inputRef(inputElement);
      }
    };

    _this.onKeyUp = function (incremental, onSearch, event) {
      if (_this.props.onKeyUp) {
        _this.props.onKeyUp(event);
        if (event.defaultPrevented) {
          return;
        }
      }
      if (onSearch && (incremental || event.keyCode === _key_codes.ENTER)) {
        onSearch(event.target.value);
      }
    };

    _this.cleanups = [];
    return _this;
  }

  _createClass(EuiFieldSearch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (_browser.Browser.isEventSupported('search', this.inputElement)) {
        var onSearch = function onSearch(event) {
          if (_this2.props.onSearch) {
            _this2.props.onSearch(event.target.value);
          }
        };
        this.inputElement.addEventListener('search', onSearch);
        this.cleanups.push(function () {
          return _this2.inputElement.removeEventListener('search', onSearch);
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.cleanups.forEach(function (cleanup) {
        return cleanup();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          id = _props.id,
          name = _props.name,
          placeholder = _props.placeholder,
          value = _props.value,
          isInvalid = _props.isInvalid,
          fullWidth = _props.fullWidth,
          isLoading = _props.isLoading,
          inputRef = _props.inputRef,
          incremental = _props.incremental,
          compressed = _props.compressed,
          onSearch = _props.onSearch,
          rest = _objectWithoutProperties(_props, ['className', 'id', 'name', 'placeholder', 'value', 'isInvalid', 'fullWidth', 'isLoading', 'inputRef', 'incremental', 'compressed', 'onSearch']);

      var classes = (0, _classnames2.default)('euiFieldSearch', {
        'euiFieldSearch--fullWidth': fullWidth,
        'euiFieldSearch--compressed': compressed,
        'euiFieldSearch-isLoading': isLoading
      }, className);

      return _react2.default.createElement(
        _form_control_layout.EuiFormControlLayout,
        {
          icon: 'search',
          fullWidth: fullWidth,
          isLoading: isLoading,
          compressed: compressed
        },
        _react2.default.createElement(
          _validatable_control.EuiValidatableControl,
          { isInvalid: isInvalid },
          _react2.default.createElement('input', _extends({
            type: 'search',
            id: id,
            name: name,
            placeholder: placeholder,
            className: classes,
            value: value,
            onKeyUp: this.onKeyUp.bind(this, incremental, onSearch),
            ref: this.setRef
          }, rest))
        )
      );
    }
  }]);

  return EuiFieldSearch;
}(_react.Component);

EuiFieldSearch.propTypes = propTypes;
EuiFieldSearch.defaultProps = defaultProps;
EuiFieldSearch.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiFieldSearch',
  'methods': [{
    'name': 'setRef',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'inputElement',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'onKeyUp',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'incremental',
      'type': null
    }, {
      'name': 'onSearch',
      'type': null
    }, {
      'name': 'event',
      'type': null
    }],
    'returns': null
  }],
  'props': {
    'name': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'id': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'placeholder': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'value': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'isInvalid': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    },
    'fullWidth': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'isLoading': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'inputRef': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'onSearch': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'incremental': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'when `true` the search will be executed (that is, the `onSearch` will be called) as the\nuser types.',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'compressed': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'when `true` creates a shorter height input',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    }
  }
}];