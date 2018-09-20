'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiDatePicker = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDatepicker = require('react-datepicker');

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _form_control_layout = require('../form/form_control_layout');

var _validatable_control = require('../form/validatable_control');

var _error_boundary = require('../error_boundary');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EuiDatePicker = exports.EuiDatePicker = function (_Component) {
  _inherits(EuiDatePicker, _Component);

  function EuiDatePicker() {
    _classCallCheck(this, EuiDatePicker);

    return _possibleConstructorReturn(this, (EuiDatePicker.__proto__ || Object.getPrototypeOf(EuiDatePicker)).apply(this, arguments));
  }

  _createClass(EuiDatePicker, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          calendarClassName = _props.calendarClassName,
          className = _props.className,
          customInput = _props.customInput,
          dateFormat = _props.dateFormat,
          dayClassName = _props.dayClassName,
          disabled = _props.disabled,
          excludeDates = _props.excludeDates,
          filterDates = _props.filterDates,
          fullWidth = _props.fullWidth,
          injectTimes = _props.injectTimes,
          inline = _props.inline,
          inputRef = _props.inputRef,
          isInvalid = _props.isInvalid,
          isLoading = _props.isLoading,
          locale = _props.locale,
          maxDate = _props.maxDate,
          maxTime = _props.maxTime,
          minDate = _props.minDate,
          minTime = _props.minTime,
          onChange = _props.onChange,
          openToDate = _props.openToDate,
          placeholder = _props.placeholder,
          popperClassName = _props.popperClassName,
          selected = _props.selected,
          shadow = _props.shadow,
          shouldCloseOnSelect = _props.shouldCloseOnSelect,
          showIcon = _props.showIcon,
          showTimeSelect = _props.showTimeSelect,
          showTimeSelectOnly = _props.showTimeSelectOnly,
          timeFormat = _props.timeFormat,
          utcOffset = _props.utcOffset,
          rest = _objectWithoutProperties(_props, ['calendarClassName', 'className', 'customInput', 'dateFormat', 'dayClassName', 'disabled', 'excludeDates', 'filterDates', 'fullWidth', 'injectTimes', 'inline', 'inputRef', 'isInvalid', 'isLoading', 'locale', 'maxDate', 'maxTime', 'minDate', 'minTime', 'onChange', 'openToDate', 'placeholder', 'popperClassName', 'selected', 'shadow', 'shouldCloseOnSelect', 'showIcon', 'showTimeSelect', 'showTimeSelectOnly', 'timeFormat', 'utcOffset']);

      var classes = (0, _classnames2.default)('euiDatePicker', {
        'euiDatePicker--shadow': shadow,
        'euiDatePicker--inline': inline
      });

      var datePickerClasses = (0, _classnames2.default)('euiDatePicker', 'euiFieldText', {
        'euiFieldText--fullWidth': fullWidth,
        'euiFieldText-isLoading': isLoading,
        'euiFieldText--withIcon': !inline && showIcon,
        'euiFieldText-isInvalid': isInvalid
      }, className);

      var optionalIcon = void 0;
      if (inline || customInput || !showIcon) {
        optionalIcon = null;
      } else if (showTimeSelectOnly) {
        optionalIcon = 'clock';
      } else {
        optionalIcon = 'calendar';
      }

      // EuiDatePicker only supports a subset of props from react-datepicker. Using any of
      // the unsupported props below will spit out an error.
      var PropNotSupported = function PropNotSupported() {
        throw new Error('You are using a prop from react-datepicker that EuiDatePicker\n        does not support. Please check the EUI documentation for more information.');
      };

      if (
      // We don't want to show multiple months next to each other
      this.props.monthsShown ||
      // There is no need to show week numbers
      this.props.showWeekNumbers ||
      // Our css adapts to height, no need to fix it
      this.props.fixedHeight ||
      // We force the month / year selection UI. No need to configure it
      this.props.dropdownMode ||
      // Short month is uncessary. Our UI has plenty of room for full months
      this.props.useShortMonthInDropdown ||
      // The today button is not needed. This should always be external to the calendar
      this.props.todayButton ||
      // We hide the time caption, so there is no need to overwrite its text
      this.props.timeCaption ||
      // We always want keyboard accessibility on
      this.props.disabledKeyboardNavigation ||
      // This is easy enough to do. It can conflict with isLoading state
      this.props.isClearable ||
      // There is no reason to launch the datepicker in its own modal. Can always build these ourselves
      this.props.withPortal) {
        return _react2.default.createElement(
          _error_boundary.EuiErrorBoundary,
          null,
          _react2.default.createElement(PropNotSupported, null)
        );
      }

      return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
          'span',
          { className: classes },
          _react2.default.createElement(
            _form_control_layout.EuiFormControlLayout,
            {
              icon: optionalIcon,
              fullWidth: fullWidth,
              isLoading: isLoading
            },
            _react2.default.createElement(
              _validatable_control.EuiValidatableControl,
              {
                isInvalid: isInvalid
              },
              _react2.default.createElement(_reactDatepicker2.default, _extends({
                calendarClassName: calendarClassName,
                className: datePickerClasses,
                customInput: customInput,
                dateFormat: dateFormat,
                dayClassName: dayClassName,
                disabled: disabled,
                excludeDates: excludeDates,
                filterDates: filterDates,
                injectTimes: injectTimes,
                inline: inline,
                locale: locale,
                maxDate: maxDate,
                maxTime: maxTime,
                minDate: minDate,
                minTime: minTime,
                onChange: onChange,
                openToDate: openToDate,
                placeholderText: placeholder,
                popperClassName: popperClassName,
                ref: inputRef,
                selected: selected,
                shouldCloseOnSelect: shouldCloseOnSelect,
                showMonthDropdown: true,
                showTimeSelect: showTimeSelect,
                showTimeSelectOnly: showTimeSelectOnly,
                showYearDropdown: true,
                timeFormat: timeFormat,
                utcOffset: utcOffset,
                yearDropdownItemNumber: 7
              }, rest))
            )
          )
        )
      );
    }
  }]);

  return EuiDatePicker;
}(_react.Component);

EuiDatePicker.propTypes = {
  /**
   * Optional class added to the calendar portion of datepicker
   */
  calendarClassName: _propTypes2.default.string,

  /**
   * Added to the actual input of the calendar
   */
  className: _propTypes2.default.string,
  /**
   * Replaces the input with any node, like a button
   */
  customInput: _propTypes2.default.node,
  /**
   * Accepts any moment format string
   */
  dateFormat: _propTypes2.default.string,
  /**
   * Applies classes to the numbered days provided. Check docs for example.
   */
  dayClassName: _propTypes2.default.func,

  /**
   * Array of dates allowed. Check docs for example.
   */
  filterDates: _propTypes2.default.array,
  /**
   * Makes the input full width
   */
  fullWidth: _propTypes2.default.bool,
  /**
   * Adds additional times to the time selector other then :30 increments
   */
  injectTimes: _propTypes2.default.array,
  /**
   * Applies ref to the input
   */
  inputRef: _propTypes2.default.func,
  /**
   * Provides styling to the input when invalid
   */
  isInvalid: _propTypes2.default.bool,
  /**
   * Provides styling to the input when loading
   */
  isLoading: _propTypes2.default.bool,
  /**
   * Switches the locale / display. "en-us", "zn-ch"...etc
   */
  locale: _propTypes2.default.string,
  /**
   * The max date accepted (in moment format) as a selection
   */
  maxDate: _propTypes2.default.instanceOf(_moment2.default),
  /**
   * The max time accepted (in moment format) as a selection
   */
  maxTime: _propTypes2.default.instanceOf(_moment2.default),
  /**
   * The min date accepted (in moment format) as a selection
   */
  minDate: _propTypes2.default.instanceOf(_moment2.default),
  /**
   * The min time accepted (in moment format) as a selection
   */
  minTime: _propTypes2.default.instanceOf(_moment2.default),
  /**
   * What to do when the input changes
   */
  onChange: _propTypes2.default.func,
  /**
   * Opens to this date (in moment format) on first press, regardless of selection
   */
  openToDate: _propTypes2.default.instanceOf(_moment2.default),
  /**
   * Shows only when no date is selected
   */
  placeholder: _propTypes2.default.string,
  /**
   * Class applied to the popup, when inline is false
   */
  popperClassName: _propTypes2.default.string,
  /**
   * The selected datetime (in moment format)
   */
  selected: _propTypes2.default.instanceOf(_moment2.default),
  /**
   * Can turn the shadow off if using the inline prop
   */
  shadow: _propTypes2.default.bool,
  /**
   * Will close the popup on selection
   */
  shouldCloseOnSelect: _propTypes2.default.bool,
  /**
   * Show the icon in input
   */
  showIcon: _propTypes2.default.bool,
  /**
   * Show the time selection alongside the calendar
   */
  showTimeSelect: _propTypes2.default.bool,
  /**
   * Only show the time selector, not the calendar
   */
  showTimeSelectOnly: _propTypes2.default.bool,
  /**
   * The format of the time within the selector, in moment notation
   */
  timeFormat: _propTypes2.default.string
};

EuiDatePicker.defaultProps = {
  dateFormat: 'MM/DD/YYYY hh:mm A',
  fullWidth: false,
  isLoading: false,
  shadow: true,
  shouldCloseOnSelect: true,
  showIcon: true,
  timeFormat: 'hh:mm A'
};
EuiDatePicker.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiDatePicker',
  'methods': [],
  'props': {
    'calendarClassName': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Optional class added to the calendar portion of datepicker'
    },
    'className': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Added to the actual input of the calendar'
    },
    'customInput': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': 'Replaces the input with any node, like a button'
    },
    'dateFormat': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Accepts any moment format string',
      'defaultValue': {
        'value': '\'MM/DD/YYYY hh:mm A\'',
        'computed': false
      }
    },
    'dayClassName': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': 'Applies classes to the numbered days provided. Check docs for example.'
    },
    'filterDates': {
      'type': {
        'name': 'array'
      },
      'required': false,
      'description': 'Array of dates allowed. Check docs for example.'
    },
    'fullWidth': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Makes the input full width',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'injectTimes': {
      'type': {
        'name': 'array'
      },
      'required': false,
      'description': 'Adds additional times to the time selector other then :30 increments'
    },
    'inputRef': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': 'Applies ref to the input'
    },
    'isInvalid': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Provides styling to the input when invalid'
    },
    'isLoading': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Provides styling to the input when loading',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'locale': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Switches the locale / display. "en-us", "zn-ch"...etc'
    },
    'maxDate': {
      'type': {
        'name': 'instanceOf',
        'value': 'moment'
      },
      'required': false,
      'description': 'The max date accepted (in moment format) as a selection'
    },
    'maxTime': {
      'type': {
        'name': 'instanceOf',
        'value': 'moment'
      },
      'required': false,
      'description': 'The max time accepted (in moment format) as a selection'
    },
    'minDate': {
      'type': {
        'name': 'instanceOf',
        'value': 'moment'
      },
      'required': false,
      'description': 'The min date accepted (in moment format) as a selection'
    },
    'minTime': {
      'type': {
        'name': 'instanceOf',
        'value': 'moment'
      },
      'required': false,
      'description': 'The min time accepted (in moment format) as a selection'
    },
    'onChange': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': 'What to do when the input changes'
    },
    'openToDate': {
      'type': {
        'name': 'instanceOf',
        'value': 'moment'
      },
      'required': false,
      'description': 'Opens to this date (in moment format) on first press, regardless of selection'
    },
    'placeholder': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Shows only when no date is selected'
    },
    'popperClassName': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'Class applied to the popup, when inline is false'
    },
    'selected': {
      'type': {
        'name': 'instanceOf',
        'value': 'moment'
      },
      'required': false,
      'description': 'The selected datetime (in moment format)'
    },
    'shadow': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Can turn the shadow off if using the inline prop',
      'defaultValue': {
        'value': 'true',
        'computed': false
      }
    },
    'shouldCloseOnSelect': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Will close the popup on selection',
      'defaultValue': {
        'value': 'true',
        'computed': false
      }
    },
    'showIcon': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Show the icon in input',
      'defaultValue': {
        'value': 'true',
        'computed': false
      }
    },
    'showTimeSelect': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Show the time selection alongside the calendar'
    },
    'showTimeSelectOnly': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Only show the time selector, not the calendar'
    },
    'timeFormat': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'The format of the time within the selector, in moment notation',
      'defaultValue': {
        'value': '\'hh:mm A\'',
        'computed': false
      }
    }
  }
}];