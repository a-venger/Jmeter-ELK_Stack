'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomItemAction = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomItemAction = exports.CustomItemAction = function (_Component) {
  _inherits(CustomItemAction, _Component);

  function CustomItemAction(props) {
    _classCallCheck(this, CustomItemAction);

    var _this = _possibleConstructorReturn(this, (CustomItemAction.__proto__ || Object.getPrototypeOf(CustomItemAction)).call(this, props));

    _this.onFocus = function () {
      if (_this.mounted) {
        _this.setState({ hasFocus: true });
      }
    };

    _this.onBlur = function () {
      if (_this.mounted) {
        _this.setState({ hasFocus: false });
      }
    };

    _this.hasFocus = function () {
      return _this.state.hasFocus;
    };

    _this.state = { hasFocus: false };

    // while generally considered an anti-pattern, here we require
    // to do that as the onFocus/onBlur events of the action controls
    // may trigger while this component is unmounted. An alternative
    // (at least the workarounds suggested by react is to unregister
    // the onFocus/onBlur listeners from the action controls... this
    // unfortunately will lead to unecessarily complex code... so we'll
    // stick to this approach for now)
    _this.mounted = false;
    return _this;
  }

  _createClass(CustomItemAction, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          action = _props.action,
          enabled = _props.enabled,
          item = _props.item,
          className = _props.className;

      var tool = action.render(item, enabled);
      var clonedTool = (0, _react.cloneElement)(tool, { onFocus: this.onFocus, onBlur: this.onBlur });
      var style = this.hasFocus() ? { opacity: 1 } : null;
      return _react2.default.createElement(
        'div',
        { style: style, className: className },
        clonedTool
      );
    }
  }]);

  return CustomItemAction;
}(_react.Component);

CustomItemAction.__docgenInfo = [{
  'description': '',
  'displayName': 'CustomItemAction',
  'methods': [{
    'name': 'onFocus',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'onBlur',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'hasFocus',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }]
}];