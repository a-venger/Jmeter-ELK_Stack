'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiConfirmModal = exports.CANCEL_BUTTON = exports.CONFIRM_BUTTON = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _modal = require('./modal');

var _modal_footer = require('./modal_footer');

var _modal_header = require('./modal_header');

var _modal_header_title = require('./modal_header_title');

var _modal_body = require('./modal_body');

var _button = require('../button');

var _text = require('../text');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CONFIRM_BUTTON = exports.CONFIRM_BUTTON = 'confirm';
var CANCEL_BUTTON = exports.CANCEL_BUTTON = 'cancel';

var CONFIRM_MODAL_BUTTONS = [CONFIRM_BUTTON, CANCEL_BUTTON];

var EuiConfirmModal = exports.EuiConfirmModal = function (_Component) {
  _inherits(EuiConfirmModal, _Component);

  function EuiConfirmModal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EuiConfirmModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EuiConfirmModal.__proto__ || Object.getPrototypeOf(EuiConfirmModal)).call.apply(_ref, [this].concat(args))), _this), _this.confirmRef = function (node) {
      return _this.confirmButton = node;
    }, _this.cancelRef = function (node) {
      return _this.cancelButton = node;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EuiConfirmModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // We have to do this instead of using `autoFocus` because React's polyfill for auto-focusing
      // elements conflicts with the focus-trap logic we have on EuiModal.
      var defaultFocusedButton = this.props.defaultFocusedButton;

      // Wait a beat for the focus-trap to complete, and then set focus to the right button. Check that
      // the buttons exist first, because it's possible the modal has been closed already.

      requestAnimationFrame(function () {
        if (defaultFocusedButton === CANCEL_BUTTON && _this2.cancelButton) {
          _this2.cancelButton.focus();
        } else if (defaultFocusedButton === CONFIRM_BUTTON && _this2.confirmButton) {
          _this2.confirmButton.focus();
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          title = _props.title,
          onCancel = _props.onCancel,
          onConfirm = _props.onConfirm,
          cancelButtonText = _props.cancelButtonText,
          confirmButtonText = _props.confirmButtonText,
          className = _props.className,
          buttonColor = _props.buttonColor,
          defaultFocusedButton = _props.defaultFocusedButton,
          rest = _objectWithoutProperties(_props, ['children', 'title', 'onCancel', 'onConfirm', 'cancelButtonText', 'confirmButtonText', 'className', 'buttonColor', 'defaultFocusedButton']);

      var classes = (0, _classnames2.default)('euiModal--confirmation', className);

      var modalTitle = void 0;

      if (title) {
        modalTitle = _react2.default.createElement(
          _modal_header.EuiModalHeader,
          null,
          _react2.default.createElement(
            _modal_header_title.EuiModalHeaderTitle,
            { 'data-test-subj': 'confirmModalTitleText' },
            title
          )
        );
      }

      var message = void 0;

      if (typeof children === 'string') {
        message = _react2.default.createElement(
          'p',
          null,
          children
        );
      } else {
        message = children;
      }

      return _react2.default.createElement(
        _modal.EuiModal,
        _extends({
          className: classes,
          onClose: onCancel
        }, rest),
        modalTitle,
        _react2.default.createElement(
          _modal_body.EuiModalBody,
          null,
          _react2.default.createElement(
            _text.EuiText,
            { 'data-test-subj': 'confirmModalBodyText' },
            message
          )
        ),
        _react2.default.createElement(
          _modal_footer.EuiModalFooter,
          null,
          _react2.default.createElement(
            _button.EuiButtonEmpty,
            {
              'data-test-subj': 'confirmModalCancelButton',
              onClick: onCancel,
              buttonRef: this.cancelRef
            },
            cancelButtonText
          ),
          _react2.default.createElement(
            _button.EuiButton,
            {
              'data-test-subj': 'confirmModalConfirmButton',
              onClick: onConfirm,
              fill: true,
              buttonRef: this.confirmRef,
              color: buttonColor
            },
            confirmButtonText
          )
        )
      );
    }
  }]);

  return EuiConfirmModal;
}(_react.Component);

EuiConfirmModal.propTypes = {
  children: _propTypes2.default.node,
  title: _propTypes2.default.node,
  cancelButtonText: _propTypes2.default.node,
  confirmButtonText: _propTypes2.default.node,
  onCancel: _propTypes2.default.func,
  onConfirm: _propTypes2.default.func,
  className: _propTypes2.default.string,
  defaultFocusedButton: _propTypes2.default.oneOf(CONFIRM_MODAL_BUTTONS),
  buttonColor: _propTypes2.default.string
};

EuiConfirmModal.defaultProps = {
  buttonColor: 'primary'
};
EuiConfirmModal.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiConfirmModal',
  'methods': [{
    'name': 'confirmRef',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'node',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'cancelRef',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'node',
      'type': null
    }],
    'returns': null
  }],
  'props': {
    'children': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': ''
    },
    'title': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': ''
    },
    'cancelButtonText': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': ''
    },
    'confirmButtonText': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': ''
    },
    'onCancel': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'onConfirm': {
      'type': {
        'name': 'func'
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
    'defaultFocusedButton': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '\'confirm\'',
          'computed': false
        }, {
          'value': '\'cancel\'',
          'computed': false
        }]
      },
      'required': false,
      'description': ''
    },
    'buttonColor': {
      'type': {
        'name': 'string'
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