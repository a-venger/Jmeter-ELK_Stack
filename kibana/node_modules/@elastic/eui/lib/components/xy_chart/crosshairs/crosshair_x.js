'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiCrosshairX = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactVis = require('react-vis');

var _chart_utils = require('../utils/chart_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Crosshair used by the XYChart as main tooltip mechanism along X axis (vertical).
 */
var EuiCrosshairX = exports.EuiCrosshairX = function (_AbstractSeries) {
  _inherits(EuiCrosshairX, _AbstractSeries);

  function EuiCrosshairX() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EuiCrosshairX);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EuiCrosshairX.__proto__ || Object.getPrototypeOf(EuiCrosshairX)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      values: []
    }, _this._formatXValue = function (x) {
      var xType = _this.props.xType;

      if (xType === _chart_utils.SCALE.TIME || xType === _chart_utils.SCALE.TIME_UTC) {
        return new Date(x).toISOString(); // TODO add a props for time formatting
      } else {
        return x;
      }
    }, _this._titleFormat = function () {
      var dataPoints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (dataPoints.length > 0) {
        var _dataPoints = _slicedToArray(dataPoints, 1),
            firstDataPoint = _dataPoints[0];

        var originalValues = firstDataPoint.originalValues;

        var value = typeof originalValues.x0 === 'number' ? _this._formatXValue(originalValues.x0) + ' to ' + _this._formatXValue(originalValues.x) : _this._formatXValue(originalValues.x);
        return {
          title: 'X Value',
          value: value
        };
      }
    }, _this._itemsFormat = function (dataPoints) {
      var seriesNames = _this.props.seriesNames;


      return dataPoints.map(function (d) {
        return {
          title: seriesNames[d.seriesIndex],
          value: d.y
        };
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EuiCrosshairX, [{
    key: 'onParentMouseMove',
    value: function onParentMouseMove(event) {
      this._handleNearestX(event);
    }
  }, {
    key: 'onParentMouseLeave',
    value: function onParentMouseLeave() {
      if (this.props.onCrosshairUpdate) {
        this.props.onCrosshairUpdate(null);
      }
      this.setState({
        values: []
      });
    }
  }, {
    key: '_handleNearestX',
    value: function _handleNearestX(event) {
      var cleanedDataSeries = this.props._allData.filter(function (dataSeries) {
        return dataSeries;
      });
      if (cleanedDataSeries.length === 0) {
        return;
      }
      var containerCoordiante = _get(EuiCrosshairX.prototype.__proto__ || Object.getPrototypeOf(EuiCrosshairX.prototype), '_getXYCoordinateInContainer', this).call(this, event);
      this._findNearestXData(cleanedDataSeries, containerCoordiante.x);
    }

    /**
     * _findNearestXData - Find the nearest set of data in all existing series.
     *
     * @param  {type} dataSeries an array of dataseries
     * @param  {type} mouseXContainerCoords the x coordinate of the mouse on the chart container
     * @protected
     */

  }, {
    key: '_findNearestXData',
    value: function _findNearestXData(dataSeries, mouseXContainerCoords) {
      var xScaleFn = _get(EuiCrosshairX.prototype.__proto__ || Object.getPrototypeOf(EuiCrosshairX.prototype), '_getAttributeFunctor', this).call(this, 'x');
      // keeping a global min distance to filter only elements with the same distance
      var globalMinDistance = Number.POSITIVE_INFINITY;

      var nearestXData = dataSeries.map(function (data, seriesIndex) {
        var minDistance = Number.POSITIVE_INFINITY;
        var value = null;
        // TODO to increase the performance, it's better to use a search algorithm like bisect
        // starting from the assumption that we will always have the same length for
        // for each series and we can assume that the scale x index can reflect more or less
        // the position of the mouse inside the array.
        data.forEach(function (item) {
          var itemXCoords = void 0;
          var xCoord = xScaleFn(item);
          // check the right item coordinate if we use x0 and x value (e.g. on histograms)
          if (typeof item.x0 === 'number') {
            // we need to compute the scaled x0 using the xScale attribute functor
            // we don't have access of the x0 attribute functor
            var x0Coord = xScaleFn({ x: item.x0 });
            itemXCoords = (xCoord - x0Coord) / 2 + x0Coord;
          } else {
            itemXCoords = xCoord;
          }
          var newDistance = Math.abs(mouseXContainerCoords - itemXCoords);
          if (newDistance < minDistance) {
            minDistance = newDistance;
            value = item;
          }
          globalMinDistance = Math.min(globalMinDistance, minDistance);
        });

        if (!value) {
          return;
        }

        return {
          minDistance: minDistance,
          value: value,
          seriesIndex: seriesIndex
        };
      }).filter(function (d) {
        return d;
      });

      // filter and map nearest X data per dataseries to get only the nearet onces
      var values = nearestXData.filter(function (value) {
        return value.minDistance === globalMinDistance;
      }).map(function (value) {
        // check if we are on histograms and we need to show the right x and y values
        var d = value.value;
        var x = typeof d.x0 === 'number' ? (d.x - d.x0) / 2 + d.x0 : d.x;
        var y = typeof d.y0 === 'number' ? d.y - d.y0 : d.y;
        return { x: x, y: y, originalValues: d, seriesIndex: value.seriesIndex };
      });
      var onCrosshairUpdate = this.props.onCrosshairUpdate;

      if (onCrosshairUpdate) {
        onCrosshairUpdate(values[0].x);
      }

      this.setState(function () {
        return {
          values: values
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var values = this.state.values;

      return _react2.default.createElement(_reactVis.Crosshair, _extends({
        values: values,
        style: { line: { background: 'rgb(218, 218, 218)' } },
        itemsFormat: this._itemsFormat,
        titleFormat: this._titleFormat
      }, this.props));
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props) {
      var crosshairValue = props.crosshairValue,
          _allData = props._allData;


      if (crosshairValue !== undefined) {
        return {
          values: EuiCrosshairX._computeDataFromXValue(_allData, crosshairValue)
        };
      }
      return null;
    }
  }, {
    key: '_computeDataFromXValue',
    value: function _computeDataFromXValue(dataSeries, crosshairValue) {
      var filteredAndFlattenDataByX = dataSeries.filter(function (series) {
        return series;
      }) // get only cleaned data series
      .map(function (series, seriesIndex) {
        return series.filter(function (dataPoint) {
          return dataPoint.x === crosshairValue;
        }).map(function (dataPoint) {
          return _extends({}, dataPoint, { originalValues: _extends({}, dataPoint), seriesIndex: seriesIndex });
        });
      }).reduce(function (acc, val) {
        return acc.concat(val);
      }, []);
      return filteredAndFlattenDataByX;
    }
  }, {
    key: 'requiresSVG',
    get: function get() {
      return false;
    }
  }, {
    key: 'isCanvas',
    get: function get() {
      return false;
    }
  }]);

  return EuiCrosshairX;
}(_reactVis.AbstractSeries);

EuiCrosshairX.displayName = 'EuiCrosshairX';

EuiCrosshairX.propTypes = {
  /**
   * The crosshair value used to display this crosshair (doesn't depend on mouse position)
   */
  crosshairValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * The ordered array of series names
   */
  seriesNames: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired
};
EuiCrosshairX.defaultProps = {};
EuiCrosshairX.__docgenInfo = [{
  'description': 'The Crosshair used by the XYChart as main tooltip mechanism along X axis (vertical).',
  'displayName': 'EuiCrosshairX',
  'methods': [{
    'name': 'requiresSVG',
    'docblock': null,
    'modifiers': ['static'],
    'params': [],
    'returns': null
  }, {
    'name': 'isCanvas',
    'docblock': null,
    'modifiers': ['static'],
    'params': [],
    'returns': null
  }, {
    'name': 'getDerivedStateFromProps',
    'docblock': null,
    'modifiers': ['static'],
    'params': [{
      'name': 'props',
      'type': null
    }],
    'returns': null
  }, {
    'name': '_computeDataFromXValue',
    'docblock': null,
    'modifiers': ['static'],
    'params': [{
      'name': 'dataSeries',
      'type': null
    }, {
      'name': 'crosshairValue',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'onParentMouseMove',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'event',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'onParentMouseLeave',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': '_formatXValue',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'x',
      'type': null
    }],
    'returns': null
  }, {
    'name': '_titleFormat',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'dataPoints',
      'type': null
    }],
    'returns': null
  }, {
    'name': '_itemsFormat',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'dataPoints',
      'type': null
    }],
    'returns': null
  }, {
    'name': '_handleNearestX',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'event',
      'type': null
    }],
    'returns': null
  }, {
    'name': '_findNearestXData',
    'docblock': '_findNearestXData - Find the nearest set of data in all existing series.\n\n@param  {type} dataSeries an array of dataseries\n@param  {type} mouseXContainerCoords the x coordinate of the mouse on the chart container\n@protected',
    'modifiers': [],
    'params': [{
      'name': 'dataSeries',
      'description': 'an array of dataseries',
      'type': {
        'name': 'type'
      }
    }, {
      'name': 'mouseXContainerCoords',
      'description': 'the x coordinate of the mouse on the chart container',
      'type': {
        'name': 'type'
      }
    }],
    'returns': null,
    'description': '_findNearestXData - Find the nearest set of data in all existing series.'
  }],
  'props': {
    'crosshairValue': {
      'type': {
        'name': 'union',
        'value': [{
          'name': 'string'
        }, {
          'name': 'number'
        }]
      },
      'required': false,
      'description': 'The crosshair value used to display this crosshair (doesn\'t depend on mouse position)'
    },
    'seriesNames': {
      'type': {
        'name': 'arrayOf',
        'value': {
          'name': 'string'
        }
      },
      'required': true,
      'description': 'The ordered array of series names'
    }
  }
}];