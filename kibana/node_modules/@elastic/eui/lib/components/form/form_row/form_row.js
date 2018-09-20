'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFormRow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _form_help_text = require('../form_help_text');

var _form_error_text = require('../form_error_text');

var _form_label = require('../form_label');

var _make_id = require('./make_id');

var _make_id2 = _interopRequireDefault(_make_id);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EuiFormRow = exports.EuiFormRow = function (_Component) {
  _inherits(EuiFormRow, _Component);

  function EuiFormRow(props) {
    _classCallCheck(this, EuiFormRow);

    var _this = _possibleConstructorReturn(this, (EuiFormRow.__proto__ || Object.getPrototypeOf(EuiFormRow)).call(this, props));

    _this.state = {
      isFocused: false,
      id: props.id || (0, _make_id2.default)()
    };

    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    return _this;
  }

  _createClass(EuiFormRow, [{
    key: 'onFocus',
    value: function onFocus() {
      // Doing this to allow onFocus to be called correctly from the child input element as this component overrides it
      var onChildFocus = (0, _lodash.get)(this.props, 'children.props.onFocus');
      if (onChildFocus) {
        onChildFocus.apply(undefined, arguments);
      }

      this.setState({
        isFocused: true
      });
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      // Doing this to allow onBlur to be called correctly from the child input element as this component overrides it
      var onChildBlur = (0, _lodash.get)(this.props, 'children.props.onBlur');
      if (onChildBlur) {
        onChildBlur.apply(undefined, arguments);
      }

      this.setState({
        isFocused: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          helpText = _props.helpText,
          isInvalid = _props.isInvalid,
          error = _props.error,
          label = _props.label,
          hasEmptyLabelSpace = _props.hasEmptyLabelSpace,
          fullWidth = _props.fullWidth,
          className = _props.className,
          describedByIds = _props.describedByIds,
          compressed = _props.compressed,
          rest = _objectWithoutProperties(_props, ['children', 'helpText', 'isInvalid', 'error', 'label', 'hasEmptyLabelSpace', 'fullWidth', 'className', 'describedByIds', 'compressed']);

      var id = this.state.id;


      var classes = (0, _classnames2.default)('euiFormRow', {
        'euiFormRow--hasEmptyLabelSpace': hasEmptyLabelSpace,
        'euiFormRow--fullWidth': fullWidth,
        'euiFormRow--compressed': compressed
      }, className);

      var optionalHelpText = void 0;

      if (helpText) {
        optionalHelpText = _react2.default.createElement(
          _form_help_text.EuiFormHelpText,
          { id: id + '-help', className: 'euiFormRow__text' },
          helpText
        );
      }

      var optionalErrors = void 0;

      if (error && isInvalid) {
        var errorTexts = Array.isArray(error) ? error : [error];
        optionalErrors = errorTexts.map(function (error, i) {
          return _react2.default.createElement(
            _form_error_text.EuiFormErrorText,
            { key: error, id: id + '-error-' + i, className: 'euiFormRow__text' },
            error
          );
        });
      }

      var optionalLabel = void 0;

      if (label) {
        optionalLabel = _react2.default.createElement(
          _form_label.EuiFormLabel,
          {
            isFocused: this.state.isFocused,
            isInvalid: isInvalid,
            'aria-invalid': isInvalid,
            htmlFor: id
          },
          label
        );
      }

      var optionalProps = {};
      var describingIds = [].concat(_toConsumableArray(describedByIds));

      if (optionalHelpText) {
        describingIds.push(optionalHelpText.props.id);
      }

      if (optionalErrors) {
        optionalErrors.forEach(function (error) {
          return describingIds.push(error.props.id);
        });
      }

      if (describingIds.length > 0) {
        optionalProps['aria-describedby'] = describingIds.join(' ');
      }

      var field = (0, _react.cloneElement)(children, _extends({
        id: id,
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        compressed: compressed
      }, optionalProps));

      return _react2.default.createElement(
        'div',
        _extends({
          className: classes
        }, rest, {
          id: id + '-row'
        }),
        optionalLabel,
        field,
        optionalErrors,
        optionalHelpText
      );
    }
  }]);

  return EuiFormRow;
}(_react.Component);

EuiFormRow.propTypes = {
  children: _propTypes2.default.node.isRequired,
  className: _propTypes2.default.string,
  label: _propTypes2.default.node,
  id: _propTypes2.default.string,
  isInvalid: _propTypes2.default.bool,
  error: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.arrayOf(_propTypes2.default.node)]),
  helpText: _propTypes2.default.node,
  hasEmptyLabelSpace: _propTypes2.default.bool,
  fullWidth: _propTypes2.default.bool,
  /**
   * IDs of additional elements that should be part of children's `aria-describedby`
   */
  describedByIds: _propTypes2.default.array,
  /**
   * Tightens up the spacing and sends down the
   * compressed prop to the input
   */
  compressed: _propTypes2.default.bool
};

EuiFormRow.defaultProps = {
  hasEmptyLabelSpace: false,
  fullWidth: false,
  describedByIds: []
};
EuiFormRow.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiFormRow',
  'methods': [{
    'name': 'onFocus',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': '...args',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'onBlur',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': '...args',
      'type': null
    }],
    'returns': null
  }],
  'props': {
    'children': {
      'type': {
        'name': 'node'
      },
      'required': true,
      'description': ''
    },
    'className': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'label': {
      'type': {
        'name': 'node'
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
    'isInvalid': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    },
    'error': {
      'type': {
        'name': 'union',
        'value': [{
          'name': 'node'
        }, {
          'name': 'arrayOf',
          'value': {
            'name': 'node'
          }
        }]
      },
      'required': false,
      'description': ''
    },
    'helpText': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': ''
    },
    'hasEmptyLabelSpace': {
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
    'describedByIds': {
      'type': {
        'name': 'array'
      },
      'required': false,
      'description': 'IDs of additional elements that should be part of children\'s `aria-describedby`',
      'defaultValue': {
        'value': '[]',
        'computed': false
      }
    },
    'compressed': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Tightens up the spacing and sends down the\ncompressed prop to the input'
    }
  }
}];