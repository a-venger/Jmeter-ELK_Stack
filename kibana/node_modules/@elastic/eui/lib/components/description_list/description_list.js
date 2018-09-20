'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiDescriptionList = exports.TEXT_STYLES = exports.ALIGNMENTS = exports.TYPES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _description_list_title = require('./description_list_title');

var _description_list_description = require('./description_list_description');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var typesToClassNameMap = {
  row: 'euiDescriptionList--row',
  column: 'euiDescriptionList--column',
  inline: 'euiDescriptionList--inline'
};

var TYPES = exports.TYPES = Object.keys(typesToClassNameMap);

var alignmentsToClassNameMap = {
  center: 'euiDescriptionList--center',
  left: ''
};

var ALIGNMENTS = exports.ALIGNMENTS = Object.keys(alignmentsToClassNameMap);

var textStylesToClassNameMap = {
  normal: '',
  reverse: 'euiDescriptionList--reverse'
};

var TEXT_STYLES = exports.TEXT_STYLES = Object.keys(textStylesToClassNameMap);

var EuiDescriptionList = function EuiDescriptionList(_ref) {
  var children = _ref.children,
      className = _ref.className,
      listItems = _ref.listItems,
      align = _ref.align,
      compressed = _ref.compressed,
      textStyle = _ref.textStyle,
      type = _ref.type,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'listItems', 'align', 'compressed', 'textStyle', 'type']);

  var classes = (0, _classnames2.default)('euiDescriptionList', typesToClassNameMap[type], alignmentsToClassNameMap[align], textStylesToClassNameMap[textStyle], {
    'euiDescriptionList--compressed': compressed
  }, className);

  var childrenOrListItems = null;
  if (listItems) {
    childrenOrListItems = listItems.map(function (item, index) {
      return [_react2.default.createElement(
        _description_list_title.EuiDescriptionListTitle,
        { key: 'title-' + index },
        item.title
      ), _react2.default.createElement(
        _description_list_description.EuiDescriptionListDescription,
        { key: 'description-' + index },
        item.description
      )];
    });
  } else {
    childrenOrListItems = children;
  }

  return _react2.default.createElement(
    'dl',
    _extends({
      className: classes
    }, rest),
    childrenOrListItems
  );
};

exports.EuiDescriptionList = EuiDescriptionList;
EuiDescriptionList.propTypes = {
  listItems: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    title: _propTypes2.default.node,
    description: _propTypes2.default.node
  })),
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,

  /**
   * Text alignment
   */
  align: _propTypes2.default.oneOf(ALIGNMENTS),

  /**
   * Smaller text and condensed spacing
   */
  compressed: _propTypes2.default.bool,

  /**
   * How should the content be styled, by default
   * this will emphasize the title
   */
  textStyle: _propTypes2.default.oneOf(TEXT_STYLES),

  /**
   * How each item should be layed out
   */
  type: _propTypes2.default.oneOf(TYPES)
};

EuiDescriptionList.defaultProps = {
  align: 'left',
  compressed: false,
  textStyle: 'normal',
  type: 'row'
};
EuiDescriptionList.__docgenInfo = [{
  'description': '',
  'methods': [],
  'props': {
    'listItems': {
      'type': {
        'name': 'arrayOf',
        'value': {
          'name': 'shape',
          'value': {
            'title': {
              'name': 'node',
              'required': false
            },
            'description': {
              'name': 'node',
              'required': false
            }
          }
        }
      },
      'required': false,
      'description': ''
    },
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
    'align': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"center"',
          'computed': false
        }, {
          'value': '"left"',
          'computed': false
        }]
      },
      'required': false,
      'description': 'Text alignment',
      'defaultValue': {
        'value': '\'left\'',
        'computed': false
      }
    },
    'compressed': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Smaller text and condensed spacing',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'textStyle': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"normal"',
          'computed': false
        }, {
          'value': '"reverse"',
          'computed': false
        }]
      },
      'required': false,
      'description': 'How should the content be styled, by default\nthis will emphasize the title',
      'defaultValue': {
        'value': '\'normal\'',
        'computed': false
      }
    },
    'type': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"row"',
          'computed': false
        }, {
          'value': '"column"',
          'computed': false
        }, {
          'value': '"inline"',
          'computed': false
        }]
      },
      'required': false,
      'description': 'How each item should be layed out',
      'defaultValue': {
        'value': '\'row\'',
        'computed': false
      }
    }
  }
}];