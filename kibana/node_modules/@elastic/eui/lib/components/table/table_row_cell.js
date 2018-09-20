'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTableRowCell = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ALIGNMENT = [_services.LEFT_ALIGNMENT, _services.RIGHT_ALIGNMENT, _services.CENTER_ALIGNMENT];

var EuiTableRowCell = function EuiTableRowCell(_ref) {
  var align = _ref.align,
      children = _ref.children,
      className = _ref.className,
      truncateText = _ref.truncateText,
      showOnHover = _ref.showOnHover,
      textOnly = _ref.textOnly,
      colSpan = _ref.colSpan,
      header = _ref.header,
      hideForMobile = _ref.hideForMobile,
      isMobileHeader = _ref.isMobileHeader,
      isMobileFullWidth = _ref.isMobileFullWidth,
      hasActions = _ref.hasActions,
      isExpander = _ref.isExpander,
      rest = _objectWithoutProperties(_ref, ['align', 'children', 'className', 'truncateText', 'showOnHover', 'textOnly', 'colSpan', 'header', 'hideForMobile', 'isMobileHeader', 'isMobileFullWidth', 'hasActions', 'isExpander']);

  var cellClasses = (0, _classnames2.default)('euiTableRowCell', {
    'euiTableRowCell--hideForMobile': hideForMobile,
    'euiTableRowCell--isMobileHeader': isMobileHeader,
    'euiTableRowCell--hasActions': hasActions,
    'euiTableRowCell--isMobileFullWidth': isMobileFullWidth,
    'euiTableRowCell--isExpander': isExpander
  });

  var contentClasses = (0, _classnames2.default)('euiTableCellContent', className, {
    'euiTableCellContent--alignRight': align === _services.RIGHT_ALIGNMENT,
    'euiTableCellContent--alignCenter': align === _services.CENTER_ALIGNMENT,
    'euiTableCellContent--showOnHover': showOnHover,
    'euiTableCellContent--truncateText': truncateText,
    // We're doing this rigamarole instead of creating `euiTableCellContent--textOnly` for BWC
    // purposes for the time-being.
    'euiTableCellContent--overflowingContent': textOnly !== true
  });

  var childClasses = (0, _classnames2.default)({
    'euiTableCellContent__text': textOnly === true,
    'euiTableCellContent__hoverItem': showOnHover
  });

  var modifiedChildren = children;

  if (textOnly === true) {
    modifiedChildren = _react2.default.createElement(
      'span',
      { className: childClasses },
      children
    );
  } else if (_react2.default.isValidElement(modifiedChildren)) {
    modifiedChildren = _react2.default.Children.map(children, function (child) {
      return _react2.default.cloneElement(child, { className: (0, _classnames2.default)(child.props.className, childClasses) });
    });
  }

  return _react2.default.createElement(
    'td',
    _extends({ className: cellClasses, colSpan: colSpan, 'data-header': header }, rest),
    _react2.default.createElement(
      'div',
      { className: contentClasses },
      modifiedChildren
    )
  );
};

exports.EuiTableRowCell = EuiTableRowCell;
EuiTableRowCell.propTypes = {
  align: _propTypes2.default.oneOf(ALIGNMENT),
  showOnHover: _propTypes2.default.bool,
  truncateText: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  textOnly: _propTypes2.default.bool,
  colSpan: _propTypes2.default.number,
  /**
   * The column's header title for use in mobile view (will be added as a data-attr)
   */
  header: _propTypes2.default.string,
  /**
   * Indicates if the column was created to be the row's heading in mobile view
   * (this column will be hidden at larger screens)
   */
  isMobileHeader: _propTypes2.default.bool,
  /**
   * Indicates if the column should not show for mobile users
   * (typically hidden because a custom mobile header utilizes the column's contents)
   */
  hideForMobile: _propTypes2.default.bool,
  /**
   * Allocates 100% of the width of the container in mobile view
   * (typically cells are contained to 50%)
   */
  isMobileFullWidth: _propTypes2.default.bool,
  /**
   * Indicates if the column is dedicated to icon-only actions (affects mobile only)
   */
  hasActions: _propTypes2.default.bool,
  /**
   * Indicates if the column is dedicated as the expandable row toggle
   */
  isExpander: _propTypes2.default.bool
};

EuiTableRowCell.defaultProps = {
  align: _services.LEFT_ALIGNMENT,
  textOnly: true
};