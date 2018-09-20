'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiHeaderLinks = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../../icon');

var _popover = require('../../popover');

var _header_section = require('../header_section');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EuiHeaderLinks = exports.EuiHeaderLinks = function (_Component) {
  _inherits(EuiHeaderLinks, _Component);

  function EuiHeaderLinks(props) {
    _classCallCheck(this, EuiHeaderLinks);

    var _this = _possibleConstructorReturn(this, (EuiHeaderLinks.__proto__ || Object.getPrototypeOf(EuiHeaderLinks)).call(this, props));

    _this.onMenuButtonClick = function () {
      _this.setState({
        isOpen: !_this.state.isOpen
      });
    };

    _this.closeMenu = function () {
      _this.setState({
        isOpen: false
      });
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  _createClass(EuiHeaderLinks, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          rest = _objectWithoutProperties(_props, ['children', 'className']);

      var classes = (0, _classnames2.default)('euiHeaderLinks', className);

      var button = _react2.default.createElement(
        _header_section.EuiHeaderSectionItem,
        { border: 'left' },
        _react2.default.createElement(
          _header_section.EuiHeaderSectionItemButton,
          {
            'aria-label': 'Open navigation menu',
            onClick: this.onMenuButtonClick
          },
          _react2.default.createElement(_icon.EuiIcon, { type: 'apps', size: 'm' })
        )
      );

      return _react2.default.createElement(
        'nav',
        _extends({
          className: classes,
          'aria-label': 'App navigation'
        }, rest),
        _react2.default.createElement(
          'div',
          { className: 'euiHeaderLinks__list', role: 'navigation' },
          children
        ),
        _react2.default.createElement(
          _popover.EuiPopover,
          {
            className: 'euiHeaderLinks__mobile',
            ownFocus: true,
            button: button,
            isOpen: this.state.isOpen,
            anchorPosition: 'downRight',
            closePopover: this.closeMenu,
            panelClassName: 'euiHeaderLinks__mobileList',
            panelPaddingSize: 'none'
          },
          children
        )
      );
    }
  }]);

  return EuiHeaderLinks;
}(_react.Component);

EuiHeaderLinks.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};
EuiHeaderLinks.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiHeaderLinks',
  'methods': [{
    'name': 'onMenuButtonClick',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'closeMenu',
    'docblock': null,
    'modifiers': [],
    'params': [],
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
    }
  }
}];