'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiGlobalToastList = exports.TOAST_FADE_OUT_MS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _time = require('../../services/time');

var _global_toast_list_item = require('./global_toast_list_item');

var _toast = require('./toast');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TOAST_FADE_OUT_MS = exports.TOAST_FADE_OUT_MS = 250;

var EuiGlobalToastList = exports.EuiGlobalToastList = function (_Component) {
  _inherits(EuiGlobalToastList, _Component);

  function EuiGlobalToastList(props) {
    _classCallCheck(this, EuiGlobalToastList);

    var _this = _possibleConstructorReturn(this, (EuiGlobalToastList.__proto__ || Object.getPrototypeOf(EuiGlobalToastList)).call(this, props));

    _this.onMouseEnter = function () {
      // Stop scrolling to bottom if we're in mid-scroll, because the user wants to interact with
      // the list.
      _this.isScrollingToBottom = false;
      _this.isUserInteracting = true;

      // Don't let toasts dismiss themselves while the user is interacting with them.
      for (var toastId in _this.toastIdToTimerMap) {
        if (_this.toastIdToTimerMap.hasOwnProperty(toastId)) {
          var timer = _this.toastIdToTimerMap[toastId];
          timer.pause();
        }
      }
    };

    _this.onMouseLeave = function () {
      _this.isUserInteracting = false;
      for (var toastId in _this.toastIdToTimerMap) {
        if (_this.toastIdToTimerMap.hasOwnProperty(toastId)) {
          var timer = _this.toastIdToTimerMap[toastId];
          timer.resume();
        }
      }
    };

    _this.onScroll = function () {
      _this.isScrolledToBottom = _this.listElement.scrollHeight - _this.listElement.scrollTop === _this.listElement.clientHeight;
    };

    _this.scheduleAllToastsForDismissal = function () {
      _this.props.toasts.forEach(function (toast) {
        if (!_this.toastIdToTimerMap[toast.id]) {
          _this.scheduleToastForDismissal(toast);
        }
      });
    };

    _this.scheduleToastForDismissal = function (toast) {
      // Start fading the toast out once its lifetime elapses.
      _this.toastIdToTimerMap[toast.id] = new _time.Timer(_this.dismissToast.bind(_this, toast), _this.props.toastLifeTimeMs);
    };

    _this.dismissToast = function (toast) {
      // Remove the toast after it's done fading out.
      _this.dismissTimeoutIds.push(setTimeout(function () {
        // Because this is wrapped in a setTimeout, and because React does not guarantee when
        // state updates happen, it is possible to double-dismiss a toast
        // including by double-clicking the "x" button on the toast
        // so, first check to make sure we haven't already dismissed this toast
        if (_this.toastIdToTimerMap.hasOwnProperty(toast.id)) {
          _this.props.dismissToast(toast);
          _this.toastIdToTimerMap[toast.id].clear();
          delete _this.toastIdToTimerMap[toast.id];

          _this.setState(function (prevState) {
            var toastIdToDismissedMap = _extends({}, prevState.toastIdToDismissedMap);
            delete toastIdToDismissedMap[toast.id];

            return {
              toastIdToDismissedMap: toastIdToDismissedMap
            };
          });
        }
      }, TOAST_FADE_OUT_MS));

      _this.setState(function (prevState) {
        var toastIdToDismissedMap = _extends({}, prevState.toastIdToDismissedMap, _defineProperty({}, toast.id, true));

        return {
          toastIdToDismissedMap: toastIdToDismissedMap
        };
      });
    };

    _this.state = {
      toastIdToDismissedMap: {}
    };

    _this.dismissTimeoutIds = [];
    _this.toastIdToTimerMap = {};

    _this.isScrollingToBottom = false;
    _this.isScrolledToBottom = true;
    return _this;
  }

  _createClass(EuiGlobalToastList, [{
    key: 'startScrollingToBottom',
    value: function startScrollingToBottom() {
      var _this2 = this;

      this.isScrollingToBottom = true;

      var scrollToBottom = function scrollToBottom() {
        var position = _this2.listElement.scrollTop;
        var destination = _this2.listElement.scrollHeight - _this2.listElement.clientHeight;
        var distanceToDestination = destination - position;

        if (distanceToDestination < 5) {
          _this2.listElement.scrollTop = destination;
          _this2.isScrollingToBottom = false;
          _this2.isScrolledToBottom = true;
          return;
        }

        _this2.listElement.scrollTop = position + distanceToDestination * 0.25;

        if (_this2.isScrollingToBottom) {
          window.requestAnimationFrame(scrollToBottom);
        }
      };

      window.requestAnimationFrame(scrollToBottom);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.listElement.addEventListener('scroll', this.onScroll);
      this.listElement.addEventListener('mouseenter', this.onMouseEnter);
      this.listElement.addEventListener('mouseleave', this.onMouseLeave);
      this.scheduleAllToastsForDismissal();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      this.scheduleAllToastsForDismissal();

      if (!this.isUserInteracting) {
        // If the user has scrolled up the toast list then we don't want to annoy them by scrolling
        // all the way back to the bottom.
        if (this.isScrolledToBottom) {
          if (prevProps.toasts.length < this.props.toasts.length) {
            this.startScrollingToBottom();
          }
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.listElement.removeEventListener('scroll', this.onScroll);
      this.listElement.removeEventListener('mouseenter', this.onMouseEnter);
      this.listElement.removeEventListener('mouseleave', this.onMouseLeave);
      this.dismissTimeoutIds.forEach(clearTimeout);
      for (var toastId in this.toastIdToTimerMap) {
        if (this.toastIdToTimerMap.hasOwnProperty(toastId)) {
          var timer = this.toastIdToTimerMap[toastId];
          timer.clear();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          className = _props.className,
          toasts = _props.toasts,
          dismissToast = _props.dismissToast,
          toastLifeTimeMs = _props.toastLifeTimeMs,
          rest = _objectWithoutProperties(_props, ['className', 'toasts', 'dismissToast', 'toastLifeTimeMs']);

      var renderedToasts = toasts.map(function (toast) {
        var text = toast.text,
            rest = _objectWithoutProperties(toast, ['text']);

        return _react2.default.createElement(
          _global_toast_list_item.EuiGlobalToastListItem,
          {
            key: toast.id,
            isDismissed: _this3.state.toastIdToDismissedMap[toast.id]
          },
          _react2.default.createElement(
            _toast.EuiToast,
            _extends({
              onClose: _this3.dismissToast.bind(_this3, toast)
            }, rest),
            text
          )
        );
      });

      var classes = (0, _classnames2.default)('euiGlobalToastList', className);

      return _react2.default.createElement(
        'div',
        _extends({
          ref: function ref(element) {
            _this3.listElement = element;
          },
          className: classes
        }, rest),
        renderedToasts
      );
    }
  }]);

  return EuiGlobalToastList;
}(_react.Component);

EuiGlobalToastList.propTypes = {
  className: _propTypes2.default.string,
  toasts: _propTypes2.default.array,
  dismissToast: _propTypes2.default.func.isRequired,
  toastLifeTimeMs: _propTypes2.default.number.isRequired
};
EuiGlobalToastList.defaultProps = {
  toasts: []
};
EuiGlobalToastList.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiGlobalToastList',
  'methods': [{
    'name': 'startScrollingToBottom',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'onMouseEnter',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'onMouseLeave',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'onScroll',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'scheduleAllToastsForDismissal',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'scheduleToastForDismissal',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'toast',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'dismissToast',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'toast',
      'type': null
    }],
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
    'toasts': {
      'type': {
        'name': 'array'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '[]',
        'computed': false
      }
    },
    'dismissToast': {
      'type': {
        'name': 'func'
      },
      'required': true,
      'description': ''
    },
    'toastLifeTimeMs': {
      'type': {
        'name': 'number'
      },
      'required': true,
      'description': ''
    }
  }
}];