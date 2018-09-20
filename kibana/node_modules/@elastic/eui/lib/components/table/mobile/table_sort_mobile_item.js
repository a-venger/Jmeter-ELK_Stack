'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTableSortMobileItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _context_menu = require('../../context_menu');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiTableSortMobileItem = function EuiTableSortMobileItem(_ref) {
  var children = _ref.children,
      onSort = _ref.onSort,
      isSorted = _ref.isSorted,
      isSortAscending = _ref.isSortAscending,
      className = _ref.className,
      ariaLabel = _ref.ariaLabel,
      rest = _objectWithoutProperties(_ref, ['children', 'onSort', 'isSorted', 'isSortAscending', 'className', 'ariaLabel']);

  var sortIcon = 'empty';
  if (isSorted) {
    sortIcon = isSortAscending ? 'sortUp' : 'sortDown';
  }

  var buttonClasses = (0, _classnames2.default)('euiTableSortMobileItem', className, {
    'euiTableSortMobileItem-isSorted': isSorted
  });

  var columnTitle = ariaLabel ? ariaLabel : children;
  var statefulAriaLabel = 'Sort ' + columnTitle + ' ' + (isSortAscending ? 'descending' : 'ascending');

  return _react2.default.createElement(
    _context_menu.EuiContextMenuItem,
    _extends({
      className: buttonClasses,
      icon: sortIcon,
      onClick: onSort,
      'aria-label': statefulAriaLabel
    }, rest),
    children
  );
};

exports.EuiTableSortMobileItem = EuiTableSortMobileItem;
EuiTableSortMobileItem.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  /**
   * Callback to know when an item has been clicked
   */
  onSort: _propTypes2.default.func,
  /**
   * Indicates current option is the sorted on column
   */
  isSorted: _propTypes2.default.bool,
  /**
   * Indicates which direction the current column is sorted on
   */
  isSortAscending: _propTypes2.default.bool
};
EuiTableSortMobileItem.__docgenInfo = [{
  'description': '',
  'methods': [],
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
    'onSort': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': 'Callback to know when an item has been clicked'
    },
    'isSorted': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Indicates current option is the sorted on column'
    },
    'isSortAscending': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Indicates which direction the current column is sorted on'
    }
  }
}];