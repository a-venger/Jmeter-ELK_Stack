'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiAvatar = exports.SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _color = require('../../services/color');

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var sizeToClassNameMap = {
  'none': null,
  's': 'euiAvatar--s',
  'm': 'euiAvatar--m',
  'l': 'euiAvatar--l',
  'xl': 'euiAvatar--xl'
};

var SIZES = exports.SIZES = Object.keys(sizeToClassNameMap);

var typeToClassNameMap = {
  space: 'euiAvatar--space',
  user: 'euiAvatar--user'
};

var TYPES = Object.keys(typeToClassNameMap);

var EuiAvatar = function EuiAvatar(_ref) {
  var className = _ref.className,
      color = _ref.color,
      imageUrl = _ref.imageUrl,
      initials = _ref.initials,
      initialsLength = _ref.initialsLength,
      name = _ref.name,
      size = _ref.size,
      type = _ref.type,
      rest = _objectWithoutProperties(_ref, ['className', 'color', 'imageUrl', 'initials', 'initialsLength', 'name', 'size', 'type']);

  var classes = (0, _classnames2.default)('euiAvatar', sizeToClassNameMap[size], typeToClassNameMap[type], className);

  var optionalInitial = void 0;
  if (name && !imageUrl) {
    // Calculate the number of initials to show, maxing out at 2
    var calculatedInitialsLength = initials ? initials.split(' ').length : name.split(' ').length;
    calculatedInitialsLength = calculatedInitialsLength > 2 ? 2 : calculatedInitialsLength;

    // Check if initialsLength was passed and set to calculated, unless greater than 2
    if (initialsLength) {
      calculatedInitialsLength = initialsLength <= 2 ? initialsLength : 2;
    }

    var calculatedInitials = void 0;
    // A. Set to initials prop if exists (but trancate to 2 characters max unless length is supplied)
    if (initials) {
      calculatedInitials = initials.substring(0, calculatedInitialsLength);
    } else {
      if (name.split(' ').length > 1) {
        // B. If there are any spaces in the name, set to first letter of each word
        calculatedInitials = name.match(/\b(\w)/g).join('').substring(0, calculatedInitialsLength);
      } else {
        // C. Set to the name's initials truncated based on calculated length
        calculatedInitials = name.substring(0, calculatedInitialsLength);
      }
    }

    optionalInitial = _react2.default.createElement(
      'span',
      { 'aria-hidden': 'true' },
      calculatedInitials
    );
  }

  var assignedColor = color || _services.VISUALIZATION_COLORS[Math.floor(name.length % _services.VISUALIZATION_COLORS.length)];
  var textColor = _color.isColorDark.apply(undefined, _toConsumableArray((0, _color.hexToRgb)(assignedColor))) ? '#FFFFFF' : '#000000';

  var avatarStyle = {
    backgroundImage: imageUrl ? 'url(' + imageUrl + ')' : 'none',
    backgroundColor: assignedColor,
    color: textColor
  };

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes,
      style: avatarStyle,
      'aria-label': name,
      title: name
    }, rest),
    optionalInitial
  );
};

// TODO: Migrate to a service
exports.EuiAvatar = EuiAvatar;
function checkValidColor(props, propName, componentName) {
  var validHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(props.color);
  if (props.color && !validHex) {
    throw new Error(componentName + ' needs to pass a valid color. This can either be a three ' + 'or six character hex value');
  }
}

function checkValidInitials(props, propName, componentName) {
  // Must be the number "1" or "2"
  if (props.initialsLength && props.initialsLength > 2) {
    throw new Error(componentName + ' only accepts 1 or 2 for the initials as a number');
  }

  // Must be a string of 1 or 2 characters
  if (props.initials && props.initials.length > 2) {
    throw new Error(componentName + ' only accepts a max of 2 characters for the initials as a string');
  }
}

EuiAvatar.propTypes = {
  className: _propTypes2.default.string,
  imageUrl: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(SIZES),

  /**
   * Full name of avatar for title attribute and calculating initial if not provided
   */
  name: _propTypes2.default.string.isRequired,

  /**
   * Accepts hex value `#FFFFFF`, `#000` otherwise a viz palette color will be assigned
   */
  color: checkValidColor,

  /**
   * Specify how many characters to show (max 2 allowed).
   * By default, will show based on number of words.
   */
  initialsLength: checkValidInitials,

  /**
   * Custom initials (max 2 characters).
   * By default will take the first character (of each word).
   */
  initials: checkValidInitials,

  /**
   * The type of avatar to this is displaying
   */
  type: _propTypes2.default.oneOf(TYPES)
};

EuiAvatar.defaultProps = {
  size: 'm',
  type: 'user'
};
EuiAvatar.__docgenInfo = [{
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
    'imageUrl': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'size': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"none"',
          'computed': false
        }, {
          'value': '"s"',
          'computed': false
        }, {
          'value': '"m"',
          'computed': false
        }, {
          'value': '"l"',
          'computed': false
        }, {
          'value': '"xl"',
          'computed': false
        }]
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '\'m\'',
        'computed': false
      }
    },
    'name': {
      'type': {
        'name': 'string'
      },
      'required': true,
      'description': 'Full name of avatar for title attribute and calculating initial if not provided'
    },
    'color': {
      'type': {
        'name': 'custom',
        'raw': 'checkValidColor'
      },
      'required': false,
      'description': 'Accepts hex value `#FFFFFF`, `#000` otherwise a viz palette color will be assigned'
    },
    'initialsLength': {
      'type': {
        'name': 'custom',
        'raw': 'checkValidInitials'
      },
      'required': false,
      'description': 'Specify how many characters to show (max 2 allowed).\nBy default, will show based on number of words.'
    },
    'initials': {
      'type': {
        'name': 'custom',
        'raw': 'checkValidInitials'
      },
      'required': false,
      'description': 'Custom initials (max 2 characters).\nBy default will take the first character (of each word).'
    },
    'type': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '"space"',
          'computed': false
        }, {
          'value': '"user"',
          'computed': false
        }]
      },
      'required': false,
      'description': 'The type of avatar to this is displaying',
      'defaultValue': {
        'value': '\'user\'',
        'computed': false
      }
    }
  }
}];