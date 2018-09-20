'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiButtonGroup = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button_toggle = require('../button_toggle');

var _toggle = require('../../toggle');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiButtonGroup = function EuiButtonGroup(_ref) {
  var className = _ref.className,
      buttonSize = _ref.buttonSize,
      color = _ref.color,
      idSelected = _ref.idSelected,
      idToSelectedMap = _ref.idToSelectedMap,
      isDisabled = _ref.isDisabled,
      isFullWidth = _ref.isFullWidth,
      isIconOnly = _ref.isIconOnly,
      name = _ref.name,
      onChange = _ref.onChange,
      options = _ref.options,
      type = _ref.type,
      rest = _objectWithoutProperties(_ref, ['className', 'buttonSize', 'color', 'idSelected', 'idToSelectedMap', 'isDisabled', 'isFullWidth', 'isIconOnly', 'name', 'onChange', 'options', 'type']);

  var classes = (0, _classnames2.default)('euiButtonGroup', {
    'euiButtonGroup--fullWidth': isFullWidth
  }, className);

  return _react2.default.createElement(
    'div',
    _extends({ className: classes }, rest),
    options.map(function (option, index) {

      var isSelectedState = void 0;
      if (type === 'multi') {
        isSelectedState = idToSelectedMap[option.id] || false;
      } else {
        isSelectedState = option.id === idSelected;
      }

      return _react2.default.createElement(_button_toggle.EuiButtonToggle, {
        className: 'euiButtonGroup__button',
        color: color,
        fill: isSelectedState,
        iconSide: option.iconSide,
        iconType: option.iconType,
        id: option.id,
        isDisabled: isDisabled,
        isIconOnly: isIconOnly,
        isSelected: isSelectedState,
        key: index,
        label: option.label,
        name: name,
        onChange: onChange.bind(null, option.id, option.value),
        size: buttonSize,
        toggleClassName: 'euiButtonGroup__toggle',
        type: type,
        value: option.value
      });
    })
  );
};

exports.EuiButtonGroup = EuiButtonGroup;
EuiButtonGroup.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired
  })).isRequired,
  onChange: _propTypes2.default.func.isRequired,

  /**
   * See `EuiButton`
   */
  color: _propTypes2.default.string,

  /**
   * Most button groups should be the small button size,
   * but if you NEED to bump it to regular, change this to 'm'
   */
  buttonSize: _propTypes2.default.string,

  /**
   * Hides the label from the button content and only displays the icon
   */
  isIconOnly: _propTypes2.default.bool,
  isDisabled: _propTypes2.default.bool,

  /**
   * Makes the whole group 100% of it's parent
   */
  isFullWidth: _propTypes2.default.bool,

  /**
   * Can only a "single" option be selected or "multi"ple?
   */
  type: _propTypes2.default.oneOf(_toggle.TOGGLE_TYPES),

  /**
   * Id of selected option for `type="single"`
   */
  idSelected: _propTypes2.default.string,

  /**
   * Map of ids of selected options for `type="multi"`
   */
  idToSelectedMap: _propTypes2.default.objectOf(_propTypes2.default.bool)
};

EuiButtonGroup.defaultProps = {
  buttonSize: 's',
  color: 'text',
  idToSelectedMap: {},
  options: [],
  type: 'single'
};
EuiButtonGroup.__docgenInfo = [{
  'description': '',
  'methods': [],
  'props': {
    'options': {
      'type': {
        'name': 'arrayOf',
        'value': {
          'name': 'shape',
          'value': {
            'id': {
              'name': 'string',
              'required': true
            },
            'label': {
              'name': 'string',
              'required': true
            }
          }
        }
      },
      'required': true,
      'description': '',
      'defaultValue': {
        'value': '[]',
        'computed': false
      }
    },
    'onChange': {
      'type': {
        'name': 'func'
      },
      'required': true,
      'description': ''
    },
    'color': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'See `EuiButton`',
      'defaultValue': {
        'value': '\'text\'',
        'computed': false
      }
    },
    'buttonSize': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Most button groups should be the small button size,\nbut if you NEED to bump it to regular, change this to \'m\'',
      'defaultValue': {
        'value': '\'s\'',
        'computed': false
      }
    },
    'isIconOnly': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Hides the label from the button content and only displays the icon'
    },
    'isDisabled': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    },
    'isFullWidth': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Makes the whole group 100% of it\'s parent'
    },
    'type': {
      'type': {
        'name': 'enum',
        'computed': true,
        'value': 'TOGGLE_TYPES'
      },
      'required': false,
      'description': 'Can only a "single" option be selected or "multi"ple?',
      'defaultValue': {
        'value': '\'single\'',
        'computed': false
      }
    },
    'idSelected': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Id of selected option for `type="single"`'
    },
    'idToSelectedMap': {
      'type': {
        'name': 'objectOf',
        'value': {
          'name': 'bool'
        }
      },
      'required': false,
      'description': 'Map of ids of selected options for `type="multi"`',
      'defaultValue': {
        'value': '{}',
        'computed': false
      }
    }
  }
}];