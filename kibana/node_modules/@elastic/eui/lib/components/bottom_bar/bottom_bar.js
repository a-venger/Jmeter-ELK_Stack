'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiBottomBar = exports.PADDING_SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _portal = require('../portal');

var _accessibility = require('../accessibility');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var paddingSizeToClassNameMap = {
  none: null,
  s: 'euiBottomBar--paddingSmall',
  m: 'euiBottomBar--paddingMedium',
  l: 'euiBottomBar--paddingLarge'
};

var PADDING_SIZES = exports.PADDING_SIZES = Object.keys(paddingSizeToClassNameMap);

var EuiBottomBar = exports.EuiBottomBar = function (_Component) {
  _inherits(EuiBottomBar, _Component);

  function EuiBottomBar() {
    _classCallCheck(this, EuiBottomBar);

    return _possibleConstructorReturn(this, (EuiBottomBar.__proto__ || Object.getPrototypeOf(EuiBottomBar)).apply(this, arguments));
  }

  _createClass(EuiBottomBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var height = this.bar.clientHeight;
      document.body.style.paddingBottom = height + 'px';
      if (this.props.bodyClassName) {
        document.body.classList.add(this.props.bodyClassName);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.style.paddingBottom = null;
      if (this.props.bodyClassName) {
        document.body.classList.remove(this.props.bodyClassName);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          paddingSize = _props.paddingSize,
          bodyClassName = _props.bodyClassName,
          rest = _objectWithoutProperties(_props, ['children', 'className', 'paddingSize', 'bodyClassName']);

      var classes = (0, _classnames2.default)('euiBottomBar', paddingSizeToClassNameMap[paddingSize], className);

      return _react2.default.createElement(
        _portal.EuiPortal,
        null,
        _react2.default.createElement(
          _accessibility.EuiScreenReaderOnly,
          null,
          _react2.default.createElement(
            'p',
            { 'aria-live': 'assertive' },
            'There is a new menu opening with page level controls at the bottom of the document.'
          )
        ),
        _react2.default.createElement(
          'div',
          _extends({
            className: classes,
            ref: function ref(node) {
              _this2.bar = node;
            }
          }, rest),
          children
        )
      );
    }
  }]);

  return EuiBottomBar;
}(_react.Component);

EuiBottomBar.propTypes = {
  children: _propTypes2.default.node,
  /**
   * Optional class applied to the bar iteself
   */
  className: _propTypes2.default.string,
  /**
   * Optional class applied to the body class
   */
  bodyClassName: _propTypes2.default.string,
  /**
   * Padding applied to the bar
   */
  paddingSize: _propTypes2.default.oneOf(PADDING_SIZES)
};

EuiBottomBar.defaultProps = {
  paddingSize: 'm'
};
EuiBottomBar.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiBottomBar',
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
      'description': 'Optional class applied to the bar iteself'
    },
    'bodyClassName': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Optional class applied to the body class'
    },
    'paddingSize': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"none"',
          'computed': false
        }, {
          'value': '"s"',
          'computed': false
        }, {
          'value': '"m"',
          'computed': false
        }, {
          'value': '"l"',
          'computed': false
        }]
      },
      'required': false,
      'description': 'Padding applied to the bar',
      'defaultValue': {
        'value': '\'m\'',
        'computed': false
      }
    }
  }
}];