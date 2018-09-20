'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiDefaultAxis = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _x_axis = require('./x_axis');

var _y_axis = require('./y_axis');

var _horizontal_grid = require('./horizontal_grid');

var _vertical_grid = require('./vertical_grid');

var _chart_utils = require('../utils/chart_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Default Axis component, with X and Y axis on the bottom and left position respectively,
 * and horiznontal or vertical grid depending on the orientation prop.
 */
var EuiDefaultAxis = exports.EuiDefaultAxis = function (_PureComponent) {
  _inherits(EuiDefaultAxis, _PureComponent);

  function EuiDefaultAxis() {
    _classCallCheck(this, EuiDefaultAxis);

    return _possibleConstructorReturn(this, (EuiDefaultAxis.__proto__ || Object.getPrototypeOf(EuiDefaultAxis)).apply(this, arguments));
  }

  _createClass(EuiDefaultAxis, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          showGridLines = _props.showGridLines,
          orientation = _props.orientation,
          xOnZero = _props.xOnZero,
          yOnZero = _props.yOnZero,
          rest = _objectWithoutProperties(_props, ['showGridLines', 'orientation', 'xOnZero', 'yOnZero']);

      return _react2.default.createElement(
        _react.Fragment,
        null,
        showGridLines && orientation === _chart_utils.ORIENTATION.VERTICAL && _react2.default.createElement(_horizontal_grid.EuiHorizontalGrid, rest),
        showGridLines && orientation === _chart_utils.ORIENTATION.HORIZONTAL && _react2.default.createElement(_vertical_grid.EuiVerticalGrid, rest),
        _react2.default.createElement(_x_axis.EuiXAxis, _extends({ onZero: xOnZero }, rest)),
        _react2.default.createElement(_y_axis.EuiYAxis, _extends({ onZero: yOnZero }, rest))
      );
    }
  }]);

  return EuiDefaultAxis;
}(_react.PureComponent);

EuiDefaultAxis.displayName = 'EuiDefaultAxis';

EuiDefaultAxis.propTypes = {
  /** The orientation of the chart, used to determine the correct orientation of grids */
  orientation: _propTypes2.default.string,
  /** Show/Hide the background grids */
  showGridLines: _propTypes2.default.bool,
  /** Specify if the x axis lay on 0, otherwise lyed on min x */
  xOnZero: _propTypes2.default.bool,
  /** Specify if the y axis lay on 0, otherwise layd on min y */
  yOnZero: _propTypes2.default.bool
};

EuiDefaultAxis.defaultProps = {
  orientation: _chart_utils.ORIENTATION.VERTICAL,
  showGridLines: true,
  xOnZero: false,
  yOnZero: false
};

EuiDefaultAxis.requiresSVG = true;
EuiDefaultAxis.__docgenInfo = [{
  'description': 'The Default Axis component, with X and Y axis on the bottom and left position respectively,\nand horiznontal or vertical grid depending on the orientation prop.',
  'displayName': 'EuiDefaultAxis',
  'methods': [],
  'props': {
    'orientation': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': 'The orientation of the chart, used to determine the correct orientation of grids',
      'defaultValue': {
        'value': 'ORIENTATION.VERTICAL',
        'computed': true
      }
    },
    'showGridLines': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Show/Hide the background grids',
      'defaultValue': {
        'value': 'true',
        'computed': false
      }
    },
    'xOnZero': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Specify if the x axis lay on 0, otherwise lyed on min x',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    },
    'yOnZero': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': 'Specify if the y axis lay on 0, otherwise layd on min y',
      'defaultValue': {
        'value': 'false',
        'computed': false
      }
    }
  }
}];