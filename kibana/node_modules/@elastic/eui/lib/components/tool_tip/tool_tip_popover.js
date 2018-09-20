'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiToolTipPopover = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EuiToolTipPopover = exports.EuiToolTipPopover = function (_Component) {
  _inherits(EuiToolTipPopover, _Component);

  function EuiToolTipPopover() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EuiToolTipPopover);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EuiToolTipPopover.__proto__ || Object.getPrototypeOf(EuiToolTipPopover)).call.apply(_ref, [this].concat(args))), _this), _this.updateDimensions = function () {
      requestAnimationFrame(function () {
        // Because of this delay, sometimes `positionToolTip` becomes unavailable.
        if (_this.popover) {
          _this.props.positionToolTip(_this.popover.getBoundingClientRect());
        }
      });
    }, _this.setPopoverRef = function (ref) {
      _this.popover = ref;
      if (_this.props.popoverRef) {
        _this.props.popoverRef(ref);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EuiToolTipPopover, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.body.classList.add('euiBody-hasPortalContent');

      this.updateDimensions();
      window.addEventListener('resize', this.updateDimensions);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.classList.remove('euiBody-hasPortalContent');
      window.removeEventListener('resize', this.updateDimensions);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          title = _props.title,
          className = _props.className,
          positionToolTip = _props.positionToolTip,
          popoverRef = _props.popoverRef,
          rest = _objectWithoutProperties(_props, ['children', 'title', 'className', 'positionToolTip', 'popoverRef']);

      var classes = (0, _classnames2.default)('euiToolTipPopover', className);

      var optionalTitle = void 0;
      if (title) {
        optionalTitle = _react2.default.createElement(
          'div',
          { className: 'euiToolTip__title' },
          title
        );
      }

      return _react2.default.createElement(
        'div',
        _extends({
          className: classes,
          ref: this.setPopoverRef
        }, rest),
        optionalTitle,
        children
      );
    }
  }]);

  return EuiToolTipPopover;
}(_react.Component);

EuiToolTipPopover.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  title: _propTypes2.default.node,
  positionToolTip: _propTypes2.default.func.isRequired,
  popoverRef: _propTypes2.default.func
};
EuiToolTipPopover.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiToolTipPopover',
  'methods': [{
    'name': 'updateDimensions',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'setPopoverRef',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'ref',
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
    'className': {
      'type': {
        'name': 'string'
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
    'positionToolTip': {
      'type': {
        'name': 'func'
      },
      'required': true,
      'description': ''
    },
    'popoverRef': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    }
  }
}];