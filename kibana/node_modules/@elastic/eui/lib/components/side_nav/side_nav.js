'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiSideNav = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

var _side_nav_item = require('./side_nav_item');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EuiSideNav = exports.EuiSideNav = function (_Component) {
  _inherits(EuiSideNav, _Component);

  function EuiSideNav() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EuiSideNav);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EuiSideNav.__proto__ || Object.getPrototypeOf(EuiSideNav)).call.apply(_ref, [this].concat(args))), _this), _this.isItemOpen = function (item) {
      // The developer can force the item to be open.
      if (item.forceOpen) {
        return true;
      }

      // Of course a selected item is open.
      if (item.isSelected) {
        return true;
      }

      // The item has to be open if it has a child that's open.
      if (item.items) {
        return item.items.some(_this.isItemOpen);
      }
    }, _this.renderTree = function (items) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var renderItem = _this.props.renderItem;


      return items.map(function (item) {
        var id = item.id,
            name = item.name,
            isSelected = item.isSelected,
            childItems = item.items,
            icon = item.icon,
            onClick = item.onClick,
            href = item.href,
            forceOpen = item.forceOpen,
            rest = _objectWithoutProperties(item, ['id', 'name', 'isSelected', 'items', 'icon', 'onClick', 'href', 'forceOpen']);

        // Root items are always open.


        var isOpen = depth === 0 ? true : _this.isItemOpen(item);

        var renderedItems = void 0;

        if (childItems) {
          renderedItems = _this.renderTree(childItems, depth + 1);
        }

        return _react2.default.createElement(
          _side_nav_item.EuiSideNavItem,
          _extends({
            isOpen: isOpen,
            isSelected: isSelected,
            isParent: !!childItems,
            icon: icon,
            onClick: onClick,
            href: href,
            items: renderedItems,
            key: id,
            depth: depth,
            renderItem: renderItem
          }, rest),
          name
        );
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EuiSideNav, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          items = _props.items,
          toggleOpenOnMobile = _props.toggleOpenOnMobile,
          isOpenOnMobile = _props.isOpenOnMobile,
          mobileTitle = _props.mobileTitle,
          renderItem = _props.renderItem,
          rest = _objectWithoutProperties(_props, ['className', 'items', 'toggleOpenOnMobile', 'isOpenOnMobile', 'mobileTitle', 'renderItem']);

      var classes = (0, _classnames2.default)('euiSideNav', className, {
        'euiSideNav-isOpenMobile': isOpenOnMobile
      });

      var nav = this.renderTree(items);

      return _react2.default.createElement(
        'nav',
        _extends({
          className: classes
        }, rest),
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: 'euiSideNav__mobileToggle euiLink',
            onClick: toggleOpenOnMobile
          },
          _react2.default.createElement(
            'span',
            { className: 'euiSideNav__mobileWrap' },
            _react2.default.createElement(
              'span',
              { className: 'euiSideNav__mobileTitle' },
              mobileTitle
            ),
            _react2.default.createElement(_icon.EuiIcon, {
              className: 'euiSideNav__mobileIcon',
              type: 'apps',
              size: 'm',
              'aria-hidden': 'true'
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'euiSideNav__content', role: 'menubar' },
          nav
        )
      );
    }
  }]);

  return EuiSideNav;
}(_react.Component);

EuiSideNav.propTypes = {
  /**
   * `children` are not rendered. Use `items` to specify navigation items instead.
   */
  children: _propTypes2.default.node,
  /**
   * Class names to be merged into the final `className` property.
   */
  className: _propTypes2.default.string,
  /**
   * When called, toggles visibility of the navigation menu at mobile responsive widths. The callback should set the `isOpenOnMobile` prop to actually toggle navigation visibility.
   */
  toggleOpenOnMobile: _propTypes2.default.func,
  /**
   * If `true`, the navigation menu will be open at mobile device widths. Use in conjunction with the `toggleOpenOnMobile` prop.
   */
  isOpenOnMobile: _propTypes2.default.bool,
  /**
   * A React node to render at mobile responsive widths, representing the title of this navigation menu.
   */
  mobileTitle: _propTypes2.default.node,
  /**
   * `items` is an array of objects (navigation menu `item`s).
   * Each `item` may contain the following properties (this is an incomplete list):
   * `item.forceOpen` is an optional boolean; if set to true it will force the item to display in an "open" state at all times.
   * `item.href` is an optional string to be passed as the navigaiton item's `href` prop, and by default it will force rendering of the item as an `<a>`.
   * `item.icon` is an optional React node which will be rendered as a small icon to the left of the navigation item text.
   * `item.isSelected` is an optional boolean; if set to true it will render the item in a visible "selected" state, and will force all ancestor navigation items to render in an "open" state.
   * `item.items` is an optional array containing additional item objects, representing nested children of this navigation item.
   * `item.name` is a required React node representing the text to render for this item (usually a string will suffice).
   * `item.onClick` is an optional callback function to be passed as the navigaiton item's `onClick` prop, and by default it will force rendering of the item as a `<button>` instead of a link.
   * `item.renderItem` is an optional function overriding default rendering for this navigation item — when called, it should return a React node representing a replacement navigation item.
   */
  items: _propTypes2.default.array,
  /**
   * Overrides default navigation menu item rendering. When called, it should return a React node representing a replacement navigation item.
   */
  renderItem: _propTypes2.default.func
};

EuiSideNav.defaultProps = {
  items: []
};
EuiSideNav.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiSideNav',
  'methods': [{
    'name': 'isItemOpen',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'item',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'renderTree',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'items',
      'type': null
    }, {
      'name': 'depth',
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
      'description': '`children` are not rendered. Use `items` to specify navigation items instead.'
    },
    'className': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Class names to be merged into the final `className` property.'
    },
    'toggleOpenOnMobile': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': 'When called, toggles visibility of the navigation menu at mobile responsive widths. The callback should set the `isOpenOnMobile` prop to actually toggle navigation visibility.'
    },
    'isOpenOnMobile': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'If `true`, the navigation menu will be open at mobile device widths. Use in conjunction with the `toggleOpenOnMobile` prop.'
    },
    'mobileTitle': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': 'A React node to render at mobile responsive widths, representing the title of this navigation menu.'
    },
    'items': {
      'type': {
        'name': 'array'
      },
      'required': false,
      'description': '`items` is an array of objects (navigation menu `item`s).\nEach `item` may contain the following properties (this is an incomplete list):\n`item.forceOpen` is an optional boolean; if set to true it will force the item to display in an "open" state at all times.\n`item.href` is an optional string to be passed as the navigaiton item\'s `href` prop, and by default it will force rendering of the item as an `<a>`.\n`item.icon` is an optional React node which will be rendered as a small icon to the left of the navigation item text.\n`item.isSelected` is an optional boolean; if set to true it will render the item in a visible "selected" state, and will force all ancestor navigation items to render in an "open" state.\n`item.items` is an optional array containing additional item objects, representing nested children of this navigation item.\n`item.name` is a required React node representing the text to render for this item (usually a string will suffice).\n`item.onClick` is an optional callback function to be passed as the navigaiton item\'s `onClick` prop, and by default it will force rendering of the item as a `<button>` instead of a link.\n`item.renderItem` is an optional function overriding default rendering for this navigation item \u2014 when called, it should return a React node representing a replacement navigation item.',
      'defaultValue': {
        'value': '[]',
        'computed': false
      }
    },
    'renderItem': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': 'Overrides default navigation menu item rendering. When called, it should return a React node representing a replacement navigation item.'
    }
  }
}];