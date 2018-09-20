'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiRange = exports.LEVEL_COLORS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _field_number = require('../field_number');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LEVEL_COLORS = exports.LEVEL_COLORS = ['primary', 'success', 'warning', 'danger'];

var EuiRange = exports.EuiRange = function (_Component) {
  _inherits(EuiRange, _Component);

  function EuiRange(props) {
    _classCallCheck(this, EuiRange);

    var _this = _possibleConstructorReturn(this, (EuiRange.__proto__ || Object.getPrototypeOf(EuiRange)).call(this, props));

    _this.renderLabel = function (side) {
      var showLabels = _this.props.showLabels;


      if (!showLabels) {
        return;
      }

      return _react2.default.createElement(
        'label',
        { className: 'euiRange__' + side + 'Label' },
        _this.props[side]
      );
    };

    _this.renderTicks = function (tickObject) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange,
          showTicks = _this$props.showTicks,
          value = _this$props.value;


      if (!showTicks) {
        return;
      }

      // Align with item labels across the range by adding
      // left and right negative margins that is half of the tick marks
      var ticksStyle = { margin: '0 ' + tickObject.percentageWidth / -2 + '%' };

      return _react2.default.createElement(
        'div',
        { className: 'euiRange__ticks', style: ticksStyle },
        tickObject.sequence.map(function (tickValue, index) {
          var tickClasses = (0, _classnames2.default)('euiRange__tick', { 'euiRange__tick--selected': value === tickValue });

          return _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: tickClasses,
              key: index,
              disabled: disabled,
              value: tickValue,
              onClick: onChange,
              style: { width: tickObject.percentageWidth + '%' }
              // Don't allow tabbing and just let the range to do the work for non-sighted users
              , tabIndex: '-1'
            },
            tickValue
          );
        })
      );
    };

    _this.renderRange = function () {
      var _this$props2 = _this.props,
          showRange = _this$props2.showRange,
          value = _this$props2.value,
          max = _this$props2.max,
          min = _this$props2.min;


      if (!showRange) {
        return;
      }

      // Calculate the width the range based on value
      var rangeWidth = (value - min) / (max - min);
      var rangeWidthStyle = { width: rangeWidth * 100 + '%' };

      return _react2.default.createElement(
        'div',
        { className: 'euiRange__range' },
        _react2.default.createElement('div', { className: 'euiRange__range__progress', style: rangeWidthStyle })
      );
    };

    _this.renderValue = function () {
      var _this$props3 = _this.props,
          showValue = _this$props3.showValue,
          value = _this$props3.value,
          max = _this$props3.max,
          min = _this$props3.min,
          name = _this$props3.name;


      if (!showValue) {
        return;
      }

      // Calculate the left position based on value
      var decimal = (value - min) / (max - min);
      // Must be between 0-100%
      var valuePosition = decimal <= 1 ? decimal : 1;
      valuePosition = valuePosition >= 0 ? valuePosition : 0;

      var valuePositionSide = void 0;
      if (valuePosition > .5) {
        valuePositionSide = 'left';
      } else {
        valuePositionSide = 'right';
      }

      var valuePositionStyle = { left: valuePosition * 100 + '%' };

      // Change left/right position based on value (half way point)
      var valueClasses = (0, _classnames2.default)('euiRange__value', 'euiRange__value--' + valuePositionSide);

      return _react2.default.createElement(
        'div',
        { className: 'euiRange__valueWrapper' },
        _react2.default.createElement(
          'output',
          { className: valueClasses, htmlFor: name, style: valuePositionStyle },
          value
        )
      );
    };

    _this.renderLevels = function () {
      var _this$props4 = _this.props,
          levels = _this$props4.levels,
          max = _this$props4.max,
          min = _this$props4.min;


      if (levels.length < 1) {
        return;
      }

      return _react2.default.createElement(
        'div',
        { className: 'euiRange__levels' },
        levels.map(function (level, index) {
          var range = level.max - level.min;
          var width = range / (max - min) * 100;

          return _react2.default.createElement('span', { key: index, style: { width: width + '%' }, className: 'euiRange__level--' + level.color });
        })
      );
    };

    return _this;
  }

  _createClass(EuiRange, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          compressed = _props.compressed,
          disabled = _props.disabled,
          fullWidth = _props.fullWidth,
          id = _props.id,
          max = _props.max,
          min = _props.min,
          name = _props.name,
          step = _props.step,
          showLabels = _props.showLabels,
          showInput = _props.showInput,
          showTicks = _props.showTicks,
          tickInterval = _props.tickInterval,
          levels = _props.levels,
          showRange = _props.showRange,
          showValue = _props.showValue,
          onChange = _props.onChange,
          value = _props.value,
          style = _props.style,
          rest = _objectWithoutProperties(_props, ['className', 'compressed', 'disabled', 'fullWidth', 'id', 'max', 'min', 'name', 'step', 'showLabels', 'showInput', 'showTicks', 'tickInterval', 'levels', 'showRange', 'showValue', 'onChange', 'value', 'style']);

      var classes = (0, _classnames2.default)('euiRange', {
        'euiRange--fullWidth': fullWidth,
        'euiRange--compressed': compressed
      }, className);

      var wrapperClasses = (0, _classnames2.default)('euiRange__wrapper', {
        'euiRange__wrapper--fullWidth': fullWidth,
        'euiRange__wrapper--compressed': compressed,
        'euiRange__wrapper--disabled': disabled,
        'euiRange__wrapper--hasLabels': showLabels,
        'euiRange__wrapper--hasLevels': levels.length,
        'euiRange__wrapper--hasRange': showRange,
        'euiRange__wrapper--hasTicks': showTicks,
        'euiRange__wrapper--hasValue': showValue
      });

      var sliderTabIndex = void 0;
      var extraInputNode = void 0;
      if (showInput) {
        // Chrome will properly size the input based on the max value, but FF & IE does not.
        // Calculate the max-width of the input based on number of characters in max unit
        // Add 2 to accomodate for input stepper
        var maxWidthStyle = { maxWidth: String(max).length + 2 + 'em' };

        // Make this input the main control by disabling screen reader access to slider control
        sliderTabIndex = '-1';

        extraInputNode = _react2.default.createElement(_field_number.EuiFieldNumber, _extends({
          name: name,
          className: 'euiRange__extraInput',
          min: min,
          max: max,
          step: step,
          value: Number(value),
          disabled: disabled,
          compressed: compressed,
          onChange: onChange,
          style: maxWidthStyle
        }, rest));
      }

      var tickObject = void 0;
      var inputWrapperStyle = {};
      if (showTicks) {
        tickObject = calculateTicksObject(min, max, tickInterval || step || 1);

        // Calculate if any extra margin should be added to the inputWrapper
        // because of longer tick labels on the ends
        var lengthOfMinLabel = String(tickObject.sequence[0]).length;
        var lenghtOfMaxLabel = String(tickObject.sequence[tickObject.sequence.length - 1]).length;
        var isLastTickTheMax = tickObject.sequence[tickObject.sequence.length - 1] === max;
        if (lengthOfMinLabel > 2) {
          inputWrapperStyle.marginLeft = lengthOfMinLabel / 5 + 'em';
        }
        if (isLastTickTheMax && lenghtOfMaxLabel > 2) {
          inputWrapperStyle.marginRight = lenghtOfMaxLabel / 5 + 'em';
        }
      }

      return _react2.default.createElement(
        'div',
        { className: wrapperClasses },
        this.renderLabel('min'),
        _react2.default.createElement(
          'div',
          { className: 'euiRange__inputWrapper', style: inputWrapperStyle },
          _react2.default.createElement('input', _extends({
            type: 'range',
            id: id,
            name: name,
            className: classes,
            min: min,
            max: max,
            step: step,
            value: value,
            disabled: disabled,
            onChange: onChange,
            style: style,
            tabIndex: sliderTabIndex
          }, rest)),
          this.renderValue(),
          this.renderRange(),
          this.renderLevels(),
          this.renderTicks(tickObject)
        ),
        this.renderLabel('max'),
        extraInputNode
      );
    }
  }]);

  return EuiRange;
}(_react.Component);

function calculateTicksObject(min, max, interval) {
  // Calculate the width of each tick mark
  var tickWidthDecimal = interval / (max - min + interval);
  var tickWidthPercentage = tickWidthDecimal * 100;

  // Loop from min to max, creating ticks at each interval
  // (adds a very small number to the max since `range` is not inclusive of the max value)
  var toBeInclusive = .000000001;
  var sequence = (0, _lodash.range)(min, max + toBeInclusive, interval);

  return {
    decimalWidth: tickWidthDecimal,
    percentageWidth: tickWidthPercentage,
    sequence: sequence
  };
}

EuiRange.propTypes = {
  name: _propTypes2.default.string,
  id: _propTypes2.default.string,
  min: _propTypes2.default.number.isRequired,
  max: _propTypes2.default.number.isRequired,
  step: _propTypes2.default.number,
  value: _propTypes2.default.string,
  fullWidth: _propTypes2.default.bool,
  compressed: _propTypes2.default.bool,
  /**
   * Shows static min/max labels on the sides of the range slider
   */
  showLabels: _propTypes2.default.bool,
  /**
   * Displays an extra input control for direct manipulation
   */
  showInput: _propTypes2.default.bool,
  /**
   * Shows clickable tick marks and labels at the given interval (`step`/`tickInterval`)
   */
  showTicks: _propTypes2.default.bool,
  /**
   * Modifies the number of tick marks and at what interval
   */
  tickInterval: _propTypes2.default.number,
  onChange: _propTypes2.default.func,
  /**
   * Create colored indicators for certain intervals
   */
  levels: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    min: _propTypes2.default.number,
    max: _propTypes2.default.number,
    color: _propTypes2.default.oneOf(LEVEL_COLORS)
  })),
  /**
   * Shows a thick line from min to value
   */
  showRange: _propTypes2.default.bool,
  /**
   * Shows a tooltip styled value
   */
  showValue: _propTypes2.default.bool
};

EuiRange.defaultProps = {
  min: 1,
  max: 100,
  fullWidth: false,
  compressed: false,
  showLabels: false,
  showInput: false,
  showTicks: false,
  showValue: false,
  levels: []
};
EuiRange.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiRange',
  'methods': [{
    'name': 'renderLabel',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'side',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'renderTicks',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'tickObject',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'renderRange',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'renderValue',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'renderLevels',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }],
  'props': {
    'name': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'id': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'min': {
      'type': {
        'name': 'number'
      },
      'required': true,
      'description': '',
      'defaultValue': {
        'value': '1',
        'computed': false
      }
    },
    'max': {
      'type': {
        'name': 'number'
      },
      'required': true,
      'description': '',
      'defaultValue': {
        'value': '100',
        'computed': false
      }
    },
    'step': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': ''
    },
    'value': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'fullWidth': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'compressed': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'showLabels': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Shows static min/max labels on the sides of the range slider',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'showInput': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Displays an extra input control for direct manipulation',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'showTicks': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Shows clickable tick marks and labels at the given interval (`step`/`tickInterval`)',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'tickInterval': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': 'Modifies the number of tick marks and at what interval'
    },
    'onChange': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'levels': {
      'type': {
        'name': 'arrayOf',
        'value': {
          'name': 'shape',
          'value': {
            'min': {
              'name': 'number',
              'required': false
            },
            'max': {
              'name': 'number',
              'required': false
            },
            'color': {
              'name': 'enum',
              'value': [{
                'value': '\'primary\'',
                'computed': false
              }, {
                'value': '\'success\'',
                'computed': false
              }, {
                'value': '\'warning\'',
                'computed': false
              }, {
                'value': '\'danger\'',
                'computed': false
              }],
              'required': false
            }
          }
        }
      },
      'required': false,
      'description': 'Create colored indicators for certain intervals',
      'defaultValue': {
        'value': '[]',
        'computed': false
      }
    },
    'showRange': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Shows a thick line from min to value'
    },
    'showValue': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Shows a tooltip styled value',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    }
  }
}];