'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiStepsHorizontal = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _step_horizontal = require('./step_horizontal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function renderHorizontalSteps(steps) {
  return steps.map(function (step, index) {
    var children = step.children,
        className = step.className,
        disabled = step.disabled,
        isSelected = step.isSelected,
        onClick = step.onClick,
        rest = _objectWithoutProperties(step, ['children', 'className', 'disabled', 'isSelected', 'onClick']);

    return _react2.default.createElement(
      _step_horizontal.EuiStepHorizontal,
      _extends({
        className: className,
        key: index,
        step: index + 1,
        disabled: disabled,
        isSelected: isSelected,
        onClick: onClick
      }, rest),
      children
    );
  });
}

var EuiStepsHorizontal = function EuiStepsHorizontal(_ref) {
  var className = _ref.className,
      steps = _ref.steps,
      rest = _objectWithoutProperties(_ref, ['className', 'steps']);

  var classes = (0, _classnames2.default)('euiStepsHorizontal', className);

  return _react2.default.createElement(
    'div',
    _extends({
      role: 'tablist',
      className: classes
    }, rest),
    renderHorizontalSteps(steps)
  );
};

exports.EuiStepsHorizontal = EuiStepsHorizontal;
var stepPropType = _propTypes2.default.shape({
  isSelected: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  children: _propTypes2.default.node
});

EuiStepsHorizontal.propTypes = {
  className: _propTypes2.default.string,
  steps: _propTypes2.default.arrayOf(stepPropType).isRequired
};
EuiStepsHorizontal.__docgenInfo = [{
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
    'steps': {
      'type': {
        'name': 'arrayOf',
        'value': {
          'name': 'custom',
          'raw': 'stepPropType'
        }
      },
      'required': true,
      'description': ''
    }
  }
}];