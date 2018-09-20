"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiColorPickerEmptySwatch = EuiColorPickerEmptySwatch;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EuiColorPickerEmptySwatch() {
  return _react2.default.createElement(
    "svg",
    null,
    _react2.default.createElement("line", { x1: "0", y1: "100%", x2: "100%", y2: "0" })
  );
}
EuiColorPickerEmptySwatch.__docgenInfo = [{
  "description": "",
  "displayName": "EuiColorPickerEmptySwatch",
  "methods": []
}];