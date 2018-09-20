'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsFilter = exports.IsFilterConfigType = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _filter_group = require('../../filter_group');

var _predicate = require('../../../services/predicate');

var _prop_types = require('../../../utils/prop_types');

var _query = require('../query');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IsFilterConfigType = exports.IsFilterConfigType = _propTypes2.default.shape({
  type: _prop_types.EuiPropTypes.is('is').isRequired,
  field: _propTypes2.default.string.isRequired,
  name: _propTypes2.default.string.isRequired,
  negatedName: _propTypes2.default.string,
  available: _propTypes2.default.func // () => boolean
});

var IsFilterPropTypes = {
  index: _propTypes2.default.number.isRequired,
  config: IsFilterConfigType.isRequired,
  query: _propTypes2.default.any.isRequired,
  onChange: _propTypes2.default.func.isRequired // (value: boolean) => void
};

var IsFilter = exports.IsFilter = function (_Component) {
  _inherits(IsFilter, _Component);

  function IsFilter(props) {
    _classCallCheck(this, IsFilter);

    return _possibleConstructorReturn(this, (IsFilter.__proto__ || Object.getPrototypeOf(IsFilter)).call(this, props));
  }

  _createClass(IsFilter, [{
    key: 'resolveDisplay',
    value: function resolveDisplay(clause) {
      var _props$config = this.props.config,
          name = _props$config.name,
          negatedName = _props$config.negatedName;

      if ((0, _predicate.isNil)(clause)) {
        return { hasActiveFilters: false, name: name };
      }
      return _query.Query.isMust(clause) ? { hasActiveFilters: true, name: name } : { hasActiveFilters: true, name: negatedName ? negatedName : 'Not ' + name };
    }
  }, {
    key: 'valueChanged',
    value: function valueChanged(field, checked) {
      var query = checked ? this.props.query.removeIsClause(field) : this.props.query.addMustIsClause(field);
      this.props.onChange(query);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          query = _props.query,
          config = _props.config;

      var clause = query.getIsClause(config.field);
      var checked = !(0, _predicate.isNil)(clause);

      var _resolveDisplay = this.resolveDisplay(clause),
          hasActiveFilters = _resolveDisplay.hasActiveFilters,
          name = _resolveDisplay.name;

      var onClick = function onClick() {
        _this2.valueChanged(config.field, checked);
      };
      return _react2.default.createElement(
        _filter_group.EuiFilterButton,
        {
          onClick: onClick,
          hasActiveFilters: hasActiveFilters
        },
        name
      );
    }
  }]);

  return IsFilter;
}(_react.Component);

IsFilter.propTypes = IsFilterPropTypes;
IsFilter.__docgenInfo = [{
  'description': '',
  'displayName': 'IsFilter',
  'methods': [{
    'name': 'resolveDisplay',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'clause',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'valueChanged',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'field',
      'type': null
    }, {
      'name': 'checked',
      'type': null
    }],
    'returns': null
  }],
  'props': {
    'index': {
      'type': {
        'name': 'number'
      },
      'required': true,
      'description': ''
    },
    'config': {
      'type': {
        'name': 'custom',
        'raw': 'IsFilterConfigType.isRequired'
      },
      'required': false,
      'description': ''
    },
    'query': {
      'type': {
        'name': 'any'
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
    }
  }
}];