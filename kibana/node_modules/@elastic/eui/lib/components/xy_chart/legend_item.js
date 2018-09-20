"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function Container(_ref) {
  var children = _ref.children,
      disabled = _ref.disabled;
  return _react2.default.createElement(
    "div",
    {
      className: "euiLegendItemContainer",
      style: {
        opacity: disabled ? 0.4 : 1
      }
    },
    children
  );
};

var Indicator = function Indicator(_ref2) {
  var children = _ref2.children,
      color = _ref2.color;
  return _react2.default.createElement(
    "span",
    {
      className: "euiLegendItemIndicator",
      style: {
        background: color
      }
    },
    children
  );
};

var Legend = function (_PureComponent) {
  _inherits(Legend, _PureComponent);

  function Legend() {
    _classCallCheck(this, Legend);

    return _possibleConstructorReturn(this, (Legend.__proto__ || Object.getPrototypeOf(Legend)).apply(this, arguments));
  }

  _createClass(Legend, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          onClick = _props.onClick,
          color = _props.color,
          text = _props.text,
          fontSize = _props.fontSize,
          radius = _props.radius,
          _props$disabled = _props.disabled,
          disabled = _props$disabled === undefined ? false : _props$disabled,
          className = _props.className;


      return _react2.default.createElement(
        Container,
        { onClick: onClick, disabled: disabled, fontSize: fontSize, className: className },
        _react2.default.createElement(Indicator, { color: color, radius: radius }),
        text
      );
    }
  }]);

  return Legend;
}(_react.PureComponent);

exports.default = Legend;
Legend.__docgenInfo = [{
  "description": "",
  "displayName": "Legend",
  "methods": []
}];
module.exports = exports["default"];