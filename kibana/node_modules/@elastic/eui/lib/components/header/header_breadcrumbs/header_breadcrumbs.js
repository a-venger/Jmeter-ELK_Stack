'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiHeaderBreadcrumbs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _breadcrumbs = require('../../breadcrumbs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiHeaderBreadcrumbs = function EuiHeaderBreadcrumbs(_ref) {
  var className = _ref.className,
      breadcrumbs = _ref.breadcrumbs,
      rest = _objectWithoutProperties(_ref, ['className', 'breadcrumbs']);

  var classes = (0, _classnames2.default)('euiHeaderBreadcrumbs', className);

  return _react2.default.createElement(_breadcrumbs.EuiBreadcrumbs, _extends({
    max: 4,
    breadcrumbs: breadcrumbs,
    className: classes
  }, rest));
};
exports.EuiHeaderBreadcrumbs = EuiHeaderBreadcrumbs;
EuiHeaderBreadcrumbs.__docgenInfo = [{
  'description': '',
  'methods': []
}];