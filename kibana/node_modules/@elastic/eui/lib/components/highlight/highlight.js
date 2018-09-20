'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiHighlight = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var highlight = function highlight(searchSubject, searchValue) {
  var isStrict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!searchValue) {
    return searchSubject;
  }

  var normalizedSearchSubject = isStrict ? searchSubject : searchSubject.toLowerCase();
  var normalizedSearchValue = isStrict ? searchValue : searchValue.toLowerCase();

  var indexOfMatch = normalizedSearchSubject.indexOf(normalizedSearchValue);
  if (indexOfMatch === -1) {
    return searchSubject;
  }

  var preMatch = searchSubject.substr(0, indexOfMatch);
  var match = searchSubject.substr(indexOfMatch, searchValue.length);
  var postMatch = searchSubject.substr(indexOfMatch + searchValue.length);

  return _react2.default.createElement(
    _react.Fragment,
    null,
    preMatch,
    _react2.default.createElement(
      'strong',
      null,
      match
    ),
    postMatch
  );
};

var EuiHighlight = function EuiHighlight(_ref) {
  var children = _ref.children,
      className = _ref.className,
      search = _ref.search,
      strict = _ref.strict,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'search', 'strict']);

  return _react2.default.createElement(
    'span',
    _extends({
      className: className
    }, rest),
    highlight(children, search, strict)
  );
};

exports.EuiHighlight = EuiHighlight;
EuiHighlight.propTypes = {
  children: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  search: _propTypes2.default.string.isRequired,
  strict: _propTypes2.default.bool
};
EuiHighlight.__docgenInfo = [{
  'description': '',
  'methods': [],
  'props': {
    'children': {
      'type': {
        'name': 'string'
      },
      'required': true,
      'description': ''
    },
    'className': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'search': {
      'type': {
        'name': 'string'
      },
      'required': true,
      'description': ''
    },
    'strict': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    }
  }
}];