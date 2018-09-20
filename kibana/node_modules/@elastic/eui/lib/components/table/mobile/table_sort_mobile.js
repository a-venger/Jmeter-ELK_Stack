'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTableSortMobile = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button_empty = require('../../button/button_empty');

var _popover = require('../../popover');

var _context_menu = require('../../context_menu');

var _table_sort_mobile_item = require('./table_sort_mobile_item');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EuiTableSortMobile = exports.EuiTableSortMobile = function (_Component) {
  _inherits(EuiTableSortMobile, _Component);

  function EuiTableSortMobile(props) {
    _classCallCheck(this, EuiTableSortMobile);

    var _this = _possibleConstructorReturn(this, (EuiTableSortMobile.__proto__ || Object.getPrototypeOf(EuiTableSortMobile)).call(this, props));

    _this.onButtonClick = function () {
      _this.setState({
        isPopoverOpen: !_this.state.isPopoverOpen
      });
    };

    _this.closePopover = function () {
      _this.setState({
        isPopoverOpen: false
      });
    };

    _this.state = {
      isPopoverOpen: false
    };
    return _this;
  }

  _createClass(EuiTableSortMobile, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return JSON.stringify(nextProps) !== JSON.stringify(this.props) || JSON.stringify(nextState) !== JSON.stringify(this.state);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          anchorPosition = _props.anchorPosition,
          items = _props.items,
          rest = _objectWithoutProperties(_props, ['className', 'anchorPosition', 'items']);

      var classes = (0, _classnames2.default)('euiTableSortMobile', className);

      var mobileSortButton = _react2.default.createElement(
        _button_empty.EuiButtonEmpty,
        {
          iconType: 'arrowDown',
          iconSide: 'right',
          onClick: this.onButtonClick.bind(this),
          flush: 'right',
          size: 'xs'
        },
        'Sorting'
      );

      var mobileSortPopover = _react2.default.createElement(
        _popover.EuiPopover,
        _extends({
          id: 'sortPopover',
          ownFocus: true,
          button: mobileSortButton,
          isOpen: this.state.isPopoverOpen,
          closePopover: this.closePopover,
          anchorPosition: anchorPosition || 'downRight',
          panelPaddingSize: 'none'
        }, rest),
        _react2.default.createElement(_context_menu.EuiContextMenuPanel, {
          style: { minWidth: 200 },
          items: items && items.length ? items.map(function (item) {
            return _react2.default.createElement(
              _table_sort_mobile_item.EuiTableSortMobileItem,
              {
                key: item.key,
                onSort: item.onSort,
                isSorted: item.isSorted,
                isSortAscending: item.isSortAscending
              },
              item.name
            );
          }) : null,
          watchedItemProps: ['isSorted', 'isSortAscending']
        })
      );

      return _react2.default.createElement(
        'div',
        { className: classes },
        mobileSortPopover
      );
    }
  }]);

  return EuiTableSortMobile;
}(_react.Component);

EuiTableSortMobile.propTypes = {
  className: _propTypes2.default.string,
  anchorPosition: _propTypes2.default.string,
  items: _propTypes2.default.array
};
EuiTableSortMobile.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiTableSortMobile',
  'methods': [{
    'name': 'onButtonClick',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'closePopover',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }],
  'props': {
    'className': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'anchorPosition': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'items': {
      'type': {
        'name': 'array'
      },
      'required': false,
      'description': ''
    }
  }
}];