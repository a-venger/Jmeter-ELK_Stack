'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFilterSelectItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _flex = require('../flex');

var _icon = require('../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CHECKED_ON = 'on';
var CHECKED_OFF = 'off';

var resolveIconAndColor = function resolveIconAndColor(checked) {
  if (!checked) {
    return { icon: 'empty' };
  }
  return checked === CHECKED_ON ? { icon: 'check', color: 'text' } : { icon: 'cross', color: 'text' };
};

var EuiFilterSelectItem = exports.EuiFilterSelectItem = function (_Component) {
  _inherits(EuiFilterSelectItem, _Component);

  function EuiFilterSelectItem(props) {
    _classCallCheck(this, EuiFilterSelectItem);

    var _this = _possibleConstructorReturn(this, (EuiFilterSelectItem.__proto__ || Object.getPrototypeOf(EuiFilterSelectItem)).call(this, props));

    _this.focus = function () {
      if (_this.buttonRef) {
        _this.buttonRef.focus();
      }
    };

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
    return _this;
  }

  _createClass(EuiFilterSelectItem, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          disabled = _props.disabled,
          checked = _props.checked,
          rest = _objectWithoutProperties(_props, ['children', 'className', 'disabled', 'checked']);

      var classes = (0, _classnames2.default)('euiFilterSelectItem', className);

      var _resolveIconAndColor = resolveIconAndColor(checked),
          icon = _resolveIconAndColor.icon,
          color = _resolveIconAndColor.color;

      return _react2.default.createElement(
        'button',
        _extends({
          ref: function ref(_ref) {
            return _this2.buttonRef = _ref;
          },
          className: classes,
          type: 'button',
          disabled: disabled
        }, rest),
        _react2.default.createElement(
          _flex.EuiFlexGroup,
          {
            alignItems: 'center',
            gutterSize: 's',
            component: 'span',
            responsive: false
          },
          _react2.default.createElement(
            _flex.EuiFlexItem,
            { grow: false },
            _react2.default.createElement(_icon.EuiIcon, { color: color, type: icon })
          ),
          _react2.default.createElement(
            _flex.EuiFlexItem,
            null,
            children
          )
        )
      );
    }
  }]);

  return EuiFilterSelectItem;
}(_react.Component);

EuiFilterSelectItem.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  /**
   * Applies an icon and visual styling to activated items
   */
  checked: _propTypes2.default.oneOf([CHECKED_ON, CHECKED_OFF])
};
EuiFilterSelectItem.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiFilterSelectItem',
  'methods': [{
    'name': 'focus',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
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
    },
    'checked': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '\'on\'',
          'computed': false
        }, {
          'value': '\'off\'',
          'computed': false
        }]
      },
      'required': false,
      'description': 'Applies an icon and visual styling to activated items'
    }
  }
}];