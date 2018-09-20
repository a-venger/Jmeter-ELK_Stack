'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiDelayHide = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function isComponentBecomingVisible(prevHide, nextHide) {
  return prevHide === true && nextHide === false;
}

var EuiDelayHide = exports.EuiDelayHide = function (_Component) {
  _inherits(EuiDelayHide, _Component);

  function EuiDelayHide() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EuiDelayHide);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EuiDelayHide.__proto__ || Object.getPrototypeOf(EuiDelayHide)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      countdownExpired: _this.props.hide
    }, _this.startCountdown = function () {
      // only start the countdown if there is not one in progress
      if (_this.timeoutId == null) {
        _this.timeoutId = setTimeout(_this.finishCountdown, _this.props.minimumDuration);
      }
    }, _this.finishCountdown = function () {
      _this.timeoutId = null;
      _this.setState({ countdownExpired: true });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EuiDelayHide, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // if the component begins visible start counting
      if (this.props.hide === false) {
        this.startCountdown();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var isBecomingVisible = isComponentBecomingVisible(prevProps.hide, this.props.hide);
      if (isBecomingVisible) {
        this.startCountdown();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.timeoutId != null) {
        clearTimeout(this.timeoutId);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var shouldHideContent = this.props.hide === true && this.state.countdownExpired;
      return shouldHideContent ? null : this.props.render();
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var isBecomingVisible = isComponentBecomingVisible(prevState.hide, nextProps.hide);
      return {
        hide: nextProps.hide,
        countdownExpired: isBecomingVisible ? false : prevState.countdownExpired
      };
    }
  }]);

  return EuiDelayHide;
}(_react.Component);

EuiDelayHide.propTypes = {
  hide: _propTypes2.default.bool,
  minimumDuration: _propTypes2.default.number,
  render: _propTypes2.default.func.isRequired
};
EuiDelayHide.defaultProps = {
  hide: false,
  minimumDuration: 1000
};
EuiDelayHide.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiDelayHide',
  'methods': [{
    'name': 'getDerivedStateFromProps',
    'docblock': null,
    'modifiers': ['static'],
    'params': [{
      'name': 'nextProps',
      'type': null
    }, {
      'name': 'prevState',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'startCountdown',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'finishCountdown',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }],
  'props': {
    'hide': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'minimumDuration': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '1000',
        'computed': false
      }
    },
    'render': {
      'type': {
        'name': 'func'
      },
      'required': true,
      'description': ''
    }
  }
}];