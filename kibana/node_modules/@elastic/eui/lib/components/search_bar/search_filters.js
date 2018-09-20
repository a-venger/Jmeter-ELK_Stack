'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiSearchFilters = exports.SearchFiltersFiltersType = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _filters = require('./filters');

var _query = require('./query');

var _filter_group = require('../../components/filter_group');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchFiltersFiltersType = exports.SearchFiltersFiltersType = _propTypes2.default.arrayOf(_filters.FilterConfigType);

var EuiSearchFilters = exports.EuiSearchFilters = function (_Component) {
  _inherits(EuiSearchFilters, _Component);

  function EuiSearchFilters(props) {
    _classCallCheck(this, EuiSearchFilters);

    return _possibleConstructorReturn(this, (EuiSearchFilters.__proto__ || Object.getPrototypeOf(EuiSearchFilters)).call(this, props));
  }

  _createClass(EuiSearchFilters, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$filters = _props.filters,
          filters = _props$filters === undefined ? [] : _props$filters,
          query = _props.query,
          onChange = _props.onChange;

      var items = filters.reduce(function (controls, filterConfig, index) {
        if (filterConfig.available && !filterConfig.available()) {
          return controls;
        }
        var key = 'filter_' + index;
        var control = (0, _filters.createFilter)(index, filterConfig, query, onChange);
        controls.push(_react2.default.createElement(
          _react.Fragment,
          { key: key },
          control
        ));
        return controls;
      }, []);
      return _react2.default.createElement(
        _filter_group.EuiFilterGroup,
        null,
        items
      );
    }
  }]);

  return EuiSearchFilters;
}(_react.Component);

EuiSearchFilters.propTypes = {
  query: _propTypes2.default.instanceOf(_query.Query).isRequired,
  onChange: _propTypes2.default.func.isRequired,
  filters: SearchFiltersFiltersType
};
EuiSearchFilters.defaultProps = {
  filters: []
};
EuiSearchFilters.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiSearchFilters',
  'methods': [],
  'props': {
    'query': {
      'type': {
        'name': 'instanceOf',
        'value': 'Query'
      },
      'required': true,
      'description': ''
    },
    'onChange': {
      'type': {
        'name': 'func'
      },
      'required': true,
      'description': ''
    },
    'filters': {
      'type': {
        'name': 'custom',
        'raw': 'SearchFiltersFiltersType'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '[]',
        'computed': false
      }
    }
  }
}];