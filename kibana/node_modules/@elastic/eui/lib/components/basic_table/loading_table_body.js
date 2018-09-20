'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingTableBody = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _table_body = require('../table/table_body');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingTableBody = exports.LoadingTableBody = function (_Component) {
  _inherits(LoadingTableBody, _Component);

  function LoadingTableBody(props) {
    _classCallCheck(this, LoadingTableBody);

    var _this = _possibleConstructorReturn(this, (LoadingTableBody.__proto__ || Object.getPrototypeOf(LoadingTableBody)).call(this, props));

    _this.cleanups = [];
    return _this;
  }

  _createClass(LoadingTableBody, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var listener = function listener(event) {
        event.stopPropagation();
        event.preventDefault();
      };
      ['mousedown', 'mouseup', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'click', 'dblclick', 'keydown', 'keyup', 'keypress'].forEach(function (event) {
        _this2.tbody.addEventListener(event, listener, true);
        _this2.cleanups.push(function () {
          return _this2.tbody.removeEventListener(event, listener);
        });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.cleanups.forEach(function (cleanup) {
        return cleanup();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _table_body.EuiTableBody,
        {
          bodyRef: function bodyRef(tbody) {
            _this3.tbody = tbody;
          }
        },
        this.props.children
      );
    }
  }]);

  return LoadingTableBody;
}(_react.Component);

LoadingTableBody.__docgenInfo = [{
  'description': '',
  'displayName': 'LoadingTableBody',
  'methods': []
}];