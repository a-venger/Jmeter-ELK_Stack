'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiValidatableControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EuiValidatableControl = exports.EuiValidatableControl = function (_Component) {
  _inherits(EuiValidatableControl, _Component);

  function EuiValidatableControl() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EuiValidatableControl);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EuiValidatableControl.__proto__ || Object.getPrototypeOf(EuiValidatableControl)).call.apply(_ref, [this].concat(args))), _this), _this.setRef = function (node) {
      _this.control = node;

      // Call the original ref, if any
      var ref = _this.props.children.ref;

      if (typeof ref === 'function') {
        ref(node);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EuiValidatableControl, [{
    key: 'updateValidity',
    value: function updateValidity() {
      if (this.control == null || typeof this.control.setCustomValidity !== 'function') {
        return; // jsdom doesn't polyfill this for the server-side
      }

      if (this.props.isInvalid) {
        this.control.setCustomValidity('Invalid');
      } else {
        this.control.setCustomValidity('');
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateValidity();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateValidity();
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _react.cloneElement)(this.props.children, {
        ref: this.setRef
      });
    }
  }]);

  return EuiValidatableControl;
}(_react.Component);

EuiValidatableControl.propTypes = {
  children: _propTypes2.default.node,
  isInvalid: _propTypes2.default.bool
};
EuiValidatableControl.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiValidatableControl',
  'methods': [{
    'name': 'updateValidity',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'setRef',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'node',
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
      'description': ''
    },
    'isInvalid': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    }
  }
}];