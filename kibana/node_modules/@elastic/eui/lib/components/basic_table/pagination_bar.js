'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationBar = exports.defaults = exports.PaginationType = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _spacer = require('../spacer');

var _table = require('../table');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaginationType = exports.PaginationType = _propTypes2.default.shape({
  pageIndex: _propTypes2.default.number.isRequired,
  pageSize: _propTypes2.default.number.isRequired,
  totalItemCount: _propTypes2.default.number.isRequired,
  pageSizeOptions: _propTypes2.default.arrayOf(_propTypes2.default.number)
});

var defaults = exports.defaults = {
  pageSizeOptions: [10, 25, 50]
};

var PaginationBar = exports.PaginationBar = function PaginationBar(_ref) {
  var pagination = _ref.pagination,
      onPageSizeChange = _ref.onPageSizeChange,
      onPageChange = _ref.onPageChange;

  var pageSizeOptions = pagination.pageSizeOptions ? pagination.pageSizeOptions : defaults.pageSizeOptions;
  var pageCount = Math.ceil(pagination.totalItemCount / pagination.pageSize);
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_spacer.EuiSpacer, { size: 'm' }),
    _react2.default.createElement(_table.EuiTablePagination, {
      activePage: pagination.pageIndex,
      itemsPerPage: pagination.pageSize,
      itemsPerPageOptions: pageSizeOptions,
      pageCount: pageCount,
      onChangeItemsPerPage: onPageSizeChange,
      onChangePage: onPageChange
    })
  );
};

PaginationBar.propTypes = {
  pagination: PaginationType.isRequired,
  onPageSizeChange: _propTypes2.default.func.isRequired,
  onPageChange: _propTypes2.default.func.isRequired
};