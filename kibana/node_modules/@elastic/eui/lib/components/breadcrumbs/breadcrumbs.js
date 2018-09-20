'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiBreadcrumbs = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _link = require('../link');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var limitBreadcrumbs = function limitBreadcrumbs(breadcrumbs, max) {
  var breadcrumbsAtStart = [];
  var breadcrumbsAtEnd = [];
  var limit = Math.min(max, breadcrumbs.length);

  for (var i = 0; i < limit; i++) {
    // We'll alternate with displaying breadcrumbs at the end and at the start, but be biased
    // towards breadcrumbs the end so that if max is an odd number, we'll have one more
    // breadcrumb visible at the end than at the beginning.
    var isEven = i % 2 === 0;

    // We're picking breadcrumbs from the front AND the back, so we treat each iteration as a
    // half-iteration.
    var normalizedIndex = Math.floor(i * 0.5);
    var indexOfBreadcrumb = isEven ? breadcrumbs.length - 1 - normalizedIndex : normalizedIndex;
    var breadcrumb = breadcrumbs[indexOfBreadcrumb];

    if (isEven) {
      breadcrumbsAtEnd.unshift(breadcrumb);
    } else {
      breadcrumbsAtStart.push(breadcrumb);
    }
  }

  if (max < breadcrumbs.length) {
    breadcrumbsAtStart.push(_react2.default.createElement(EuiBreadcrumbCollapsed, { key: 'collapsed' }));
  }

  return [].concat(breadcrumbsAtStart, breadcrumbsAtEnd);
};

var EuiBreadcrumbCollapsed = function EuiBreadcrumbCollapsed() {
  return _react2.default.createElement(
    _react.Fragment,
    null,
    _react2.default.createElement(
      'div',
      { className: 'euiBreadcrumb euiBreadcrumb--collapsed' },
      '\u2026'
    ),
    _react2.default.createElement(EuiBreadcrumbSeparator, null)
  );
};

var EuiBreadcrumbSeparator = function EuiBreadcrumbSeparator() {
  return _react2.default.createElement('div', { className: 'euiBreadcrumbSeparator' });
};

var EuiBreadcrumbs = function EuiBreadcrumbs(_ref) {
  var breadcrumbs = _ref.breadcrumbs,
      className = _ref.className,
      responsive = _ref.responsive,
      truncate = _ref.truncate,
      max = _ref.max,
      rest = _objectWithoutProperties(_ref, ['breadcrumbs', 'className', 'responsive', 'truncate', 'max']);

  var breadcrumbElements = breadcrumbs.map(function (breadcrumb, index) {
    var text = breadcrumb.text,
        href = breadcrumb.href,
        onClick = breadcrumb.onClick,
        breadcrumbClassName = breadcrumb.className,
        breadcrumbRest = _objectWithoutProperties(breadcrumb, ['text', 'href', 'onClick', 'className']);

    var isLastBreadcrumb = index === breadcrumbs.length - 1;

    var breadcrumbClasses = (0, _classnames2.default)('euiBreadcrumb', breadcrumbClassName, {
      'euiBreadcrumb--last': isLastBreadcrumb
    });

    var link = void 0;

    if (isLastBreadcrumb) {
      link = _react2.default.createElement(
        'span',
        _extends({
          className: breadcrumbClasses,
          title: truncate ? text : undefined,
          'aria-current': 'page'
        }, breadcrumbRest),
        text
      );
    } else {
      link = _react2.default.createElement(
        _link.EuiLink,
        _extends({
          color: 'subdued',
          href: href,
          onClick: onClick,
          className: breadcrumbClasses,
          title: truncate ? text : undefined
        }, breadcrumbRest),
        text
      );
    }

    var separator = void 0;

    if (!isLastBreadcrumb) {
      separator = _react2.default.createElement(EuiBreadcrumbSeparator, null);
    }

    return _react2.default.createElement(
      _react.Fragment,
      { key: index },
      link,
      separator
    );
  });

  var limitedBreadcrumbs = max ? limitBreadcrumbs(breadcrumbElements, max) : breadcrumbElements;

  var classes = (0, _classnames2.default)('euiBreadcrumbs', className, {
    'euiBreadcrumbs--truncate': truncate,
    'euiBreadcrumbs--responsive': responsive
  });

  return _react2.default.createElement(
    'nav',
    _extends({ 'aria-label': 'breadcrumb', className: classes }, rest),
    limitedBreadcrumbs
  );
};

exports.EuiBreadcrumbs = EuiBreadcrumbs;
EuiBreadcrumbs.propTypes = {
  className: _propTypes2.default.string,
  responsive: _propTypes2.default.bool,
  truncate: _propTypes2.default.bool,
  max: _propTypes2.default.number,
  breadcrumbs: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    text: _propTypes2.default.node.isRequired,
    href: _propTypes2.default.string,
    onClick: _propTypes2.default.func
  })).isRequired
};

EuiBreadcrumbs.defaultProps = {
  responsive: true,
  truncate: true,
  max: 5
};
EuiBreadcrumbs.__docgenInfo = [{
  'description': '',
  'methods': [],
  'props': {
    'className': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'responsive': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'true',
        'computed': false
      }
    },
    'truncate': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'true',
        'computed': false
      }
    },
    'max': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '5',
        'computed': false
      }
    },
    'breadcrumbs': {
      'type': {
        'name': 'arrayOf',
        'value': {
          'name': 'shape',
          'value': {
            'text': {
              'name': 'node',
              'required': true
            },
            'href': {
              'name': 'string',
              'required': false
            },
            'onClick': {
              'name': 'func',
              'required': false
            }
          }
        }
      },
      'required': true,
      'description': ''
    }
  }
}];