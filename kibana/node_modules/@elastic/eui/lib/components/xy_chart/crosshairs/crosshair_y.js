'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiCrosshairY = exports.CrosshairY = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactVis = require('react-vis');

var _chart_utils = require('../utils/chart_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed to Elasticsearch B.V. under one or more contributor
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * license agreements. See the NOTICE file distributed with
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * this work for additional information regarding copyright
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ownership. Elasticsearch B.V. licenses this file to you under
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * the Apache License, Version 2.0 (the "License"); you may
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * not use this file except in compliance with the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *    http://www.apache.org/licenses/LICENSE-2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * software distributed under the License is distributed on an
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * KIND, either express or implied.  See the License for the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * specific language governing permissions and limitations
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * under the License.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// Copyright (c) 2016 - 2017 Uber Technologies, Inc.

/**
 * Format title by detault.
 * @param {Array} values List of values.
 * @returns {*} Formatted value or undefined.
 */
function defaultTitleFormat(values) {
  var value = getFirstNonEmptyValue(values);
  if (value) {
    return {
      title: 'x',
      value: value.x
    };
  }
}

/**
 * Format items by default.
 * @param {Array} values Array of values.
 * @returns {*} Formatted list of items.
 */
function defaultItemsFormat(values) {
  return values.map(function (v, i) {
    if (v) {
      return { value: v.y, title: i };
    }
  });
}

/**
 * Get the first non-empty item from an array.
 * @param {Array} values Array of values.
 * @returns {*} First non-empty value or undefined.
 */
function getFirstNonEmptyValue(values) {
  return (values || []).find(function (v) {
    return Boolean(v);
  });
}

var CrosshairY = exports.CrosshairY = function (_PureComponent) {
  _inherits(CrosshairY, _PureComponent);

  function CrosshairY() {
    _classCallCheck(this, CrosshairY);

    return _possibleConstructorReturn(this, (CrosshairY.__proto__ || Object.getPrototypeOf(CrosshairY)).apply(this, arguments));
  }

  _createClass(CrosshairY, [{
    key: '_renderCrosshairTitle',


    /**
     * Render crosshair title.
     * @returns {*} Container with the crosshair title.
     * @private
     */
    value: function _renderCrosshairTitle() {
      var _props = this.props,
          values = _props.values,
          titleFormat = _props.titleFormat,
          style = _props.style;

      var titleItem = titleFormat(values);
      if (!titleItem) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        { className: 'rv-crosshair__title', key: 'title', style: style.title },
        _react2.default.createElement(
          'span',
          { className: 'rv-crosshair__title__title' },
          titleItem.title
        ),
        ': ',
        _react2.default.createElement(
          'span',
          { className: 'rv-crosshair__title__value' },
          titleItem.value
        )
      );
    }

    /**
     * Render crosshair items (title + value for each series).
     * @returns {*} Array of React classes with the crosshair values.
     * @private
     */

  }, {
    key: '_renderCrosshairItems',
    value: function _renderCrosshairItems() {
      var _props2 = this.props,
          values = _props2.values,
          itemsFormat = _props2.itemsFormat;

      var items = itemsFormat(values);
      if (!items) {
        return null;
      }
      return items.filter(function (i) {
        return i;
      }).map(function renderValue(item, i) {
        return _react2.default.createElement(
          'div',
          { className: 'rv-crosshair__item', key: 'item' + i },
          _react2.default.createElement(
            'span',
            { className: 'rv-crosshair__item__title' },
            item.title
          ),
          ': ',
          _react2.default.createElement(
            'span',
            { className: 'rv-crosshair__item__value' },
            item.value
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          children = _props3.children,
          className = _props3.className,
          values = _props3.values,
          marginTop = _props3.marginTop,
          marginLeft = _props3.marginLeft,
          innerWidth = _props3.innerWidth,
          style = _props3.style;

      var value = getFirstNonEmptyValue(values);
      if (!value) {
        return null;
      }
      var y = _reactVis.ScaleUtils.getAttributeFunctor(this.props, 'y');
      var innerTop = y(value);

      var left = marginLeft;
      var top = marginTop + innerTop;
      var innerClassName = 'rv-crosshair__inner rv-crosshair__inner--left';
      return _react2.default.createElement(
        'div',
        {
          className: 'rv-crosshair ' + className,
          style: { left: left + 'px', top: top + 'px' }
        },
        _react2.default.createElement('div', {
          className: 'rv-crosshair__line',
          style: _extends({ width: innerWidth + 'px', height: '1px' }, style.line)
        }),
        _react2.default.createElement(
          'div',
          { className: innerClassName },
          children ? children : _react2.default.createElement(
            'div',
            { className: 'rv-crosshair__inner__content', style: style.box },
            _react2.default.createElement(
              'div',
              null,
              this._renderCrosshairTitle(),
              this._renderCrosshairItems()
            )
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        className: _propTypes2.default.string,
        values: _propTypes2.default.array,
        series: _propTypes2.default.object,
        innerWidth: _propTypes2.default.number,
        innerHeight: _propTypes2.default.number,
        marginLeft: _propTypes2.default.number,
        marginTop: _propTypes2.default.number,
        orientation: _propTypes2.default.oneOf(['left', 'right']),
        itemsFormat: _propTypes2.default.func,
        titleFormat: _propTypes2.default.func,
        style: _propTypes2.default.shape({
          line: _propTypes2.default.object,
          title: _propTypes2.default.object,
          box: _propTypes2.default.object
        })
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        titleFormat: defaultTitleFormat,
        itemsFormat: defaultItemsFormat,
        style: {
          line: {},
          title: {},
          box: {}
        }
      };
    }
  }]);

  return CrosshairY;
}(_react.PureComponent);

CrosshairY.displayName = 'CrosshairY';

/**
 * The Crosshair used by the XYChart as main tooltip mechanism along Y axis (horizontal).
 */

var EuiCrosshairY = exports.EuiCrosshairY = function (_AbstractSeries) {
  _inherits(EuiCrosshairY, _AbstractSeries);

  function EuiCrosshairY() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, EuiCrosshairY);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = EuiCrosshairY.__proto__ || Object.getPrototypeOf(EuiCrosshairY)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
      values: []
    }, _this2._formatYValue = function (y) {
      var yType = _this2.props.yType;

      if (yType === _chart_utils.SCALE.TIME || yType === _chart_utils.SCALE.TIME_UTC) {
        return new Date(y).toISOString(); // TODO add a props for time formatting
      } else {
        return y;
      }
    }, _this2._titleFormat = function () {
      var dataPoints = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (dataPoints.length > 0) {
        var _dataPoints = _slicedToArray(dataPoints, 1),
            firstDataPoint = _dataPoints[0];

        var originalValues = firstDataPoint.originalValues;

        var value = typeof originalValues.y0 === 'number' ? _this2._formatYValue(originalValues.y0) + ' to ' + _this2._formatYValue(originalValues.y) : _this2._formatYValue(originalValues.y);
        return {
          title: 'Y Value',
          value: value
        };
      }
    }, _this2._itemsFormat = function (dataPoints) {
      var seriesNames = _this2.props.seriesNames;

      return dataPoints.map(function (d) {
        return {
          title: seriesNames[d.seriesIndex],
          value: d.x
        };
      });
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(EuiCrosshairY, [{
    key: 'onParentMouseMove',
    value: function onParentMouseMove(event) {
      this._handleNearestY(event);
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
    key: '_handleNearestY',
    value: function _handleNearestY(event) {
      var cleanedDataSeries = this.props._allData.filter(function (dataSeries) {
        return dataSeries;
      });
      if (cleanedDataSeries.length === 0) {
        return;
      }
      var containerCoordiante = _get(EuiCrosshairY.prototype.__proto__ || Object.getPrototypeOf(EuiCrosshairY.prototype), '_getXYCoordinateInContainer', this).call(this, event);
      this._findNearestYData(cleanedDataSeries, containerCoordiante.y);
    }

    /**
     * _findNearestYData - Find the nearest set of data in all existing series.
     *
     * @param  {type} dataSeries an array of dataseries
     * @param  {type} mouseYContainerCoords the y coordinate of the mouse on the chart container
     * @protected
     */

  }, {
    key: '_findNearestYData',
    value: function _findNearestYData(dataSeries, mouseYContainerCoords) {
      var yScaleFn = _get(EuiCrosshairY.prototype.__proto__ || Object.getPrototypeOf(EuiCrosshairY.prototype), '_getAttributeFunctor', this).call(this, 'y');
      // keeping a global min distance to filter only elements with the same distance
      var globalMinDistance = Number.POSITIVE_INFINITY;

      var nearestYData = dataSeries.map(function (data, seriesIndex) {
        var minDistance = Number.POSITIVE_INFINITY;
        var value = null;
        // TODO to increase the performance, it's better to use a search algorithm like bisect
        // starting from the assumption that we will always have the same length for
        // for each series and we can assume that the scale y index can reflect more or less
        // the position of the mouse inside the array.
        data.forEach(function (item) {
          var itemYCoords = void 0;
          var yCoord = yScaleFn(item);
          // check the right item coordinate if we use x0 and x value (e.g. on histograms)
          if (typeof item.y0 === 'number') {
            // we need to compute the scaled y0 using the xScale attribute functor
            // we don't have access of the y0 attribute functor
            var y0Coord = yScaleFn({ y: item.y0 });
            itemYCoords = (yCoord - y0Coord) / 2 + y0Coord;
          } else {
            itemYCoords = yCoord;
          }
          var newDistance = Math.abs(mouseYContainerCoords - itemYCoords);
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
      var values = nearestYData.filter(function (value) {
        return value.minDistance === globalMinDistance;
      }).map(function (value) {
        // check if we are on histograms and we need to show the right x and y values
        var d = value.value;
        var y = typeof d.y0 === 'number' ? (d.y - d.y0) / 2 + d.y0 : d.y;
        var x = typeof d.x0 === 'number' ? d.x - d.x0 : d.x;
        return { x: x, y: y, originalValues: d, seriesIndex: value.seriesIndex };
      });
      var onCrosshairUpdate = this.props.onCrosshairUpdate;

      if (onCrosshairUpdate) {
        onCrosshairUpdate(values[0].y);
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

      return _react2.default.createElement(CrosshairY, _extends({
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
          values: EuiCrosshairY._computeDataFromYValue(_allData, crosshairValue)
        };
      }
      return null;
    }
  }, {
    key: '_computeDataFromYValue',
    value: function _computeDataFromYValue(dataSeries, crosshairValue) {
      var filteredAndFlattenDataByY = dataSeries.filter(function (series) {
        return series;
      }) // get only cleaned data series
      .map(function (series, seriesIndex) {
        return series.filter(function (dataPoint) {
          return dataPoint.y === crosshairValue;
        }).map(function (dataPoint) {
          return _extends({}, dataPoint, { originalValues: _extends({}, dataPoint), seriesIndex: seriesIndex });
        });
      }).reduce(function (acc, val) {
        return acc.concat(val);
      }, []);
      return filteredAndFlattenDataByY;
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

  return EuiCrosshairY;
}(_reactVis.AbstractSeries);

EuiCrosshairY.displayName = 'EuiCrosshairY';

EuiCrosshairY.propTypes = {
  /**
   * The crosshair value used to display this crosshair (doesn't depend on mouse position)
   */
  crosshairValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  /**
   * The ordered array of series names
   */
  seriesNames: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired
};
EuiCrosshairY.defaultProps = {};
CrosshairY.__docgenInfo = [{
  'description': '',
  'displayName': 'CrosshairY',
  'methods': [{
    'name': 'propTypes',
    'docblock': null,
    'modifiers': ['static'],
    'params': [],
    'returns': null
  }, {
    'name': 'defaultProps',
    'docblock': null,
    'modifiers': ['static'],
    'params': [],
    'returns': null
  }, {
    'name': '_renderCrosshairTitle',
    'docblock': 'Render crosshair title.\n@returns {*} Container with the crosshair title.\n@private',
    'modifiers': [],
    'params': [],
    'returns': {
      'description': 'Container with the crosshair title.',
      'type': {
        'name': 'mixed'
      }
    },
    'description': 'Render crosshair title.'
  }, {
    'name': '_renderCrosshairItems',
    'docblock': 'Render crosshair items (title + value for each series).\n@returns {*} Array of React classes with the crosshair values.\n@private',
    'modifiers': [],
    'params': [],
    'returns': {
      'description': 'Array of React classes with the crosshair values.',
      'type': {
        'name': 'mixed'
      }
    },
    'description': 'Render crosshair items (title + value for each series).'
  }],
  'props': {
    'className': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'values': {
      'type': {
        'name': 'array'
      },
      'required': false,
      'description': ''
    },
    'series': {
      'type': {
        'name': 'object'
      },
      'required': false,
      'description': ''
    },
    'innerWidth': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': ''
    },
    'innerHeight': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': ''
    },
    'marginLeft': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': ''
    },
    'marginTop': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': ''
    },
    'orientation': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '\'left\'',
          'computed': false
        }, {
          'value': '\'right\'',
          'computed': false
        }]
      },
      'required': false,
      'description': ''
    },
    'itemsFormat': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'function defaultItemsFormat(values) {\n  return values.map((v, i) => {\n    if (v) {\n      return { value: v.y, title: i };\n    }\n  });\n}',
        'computed': false
      }
    },
    'titleFormat': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'function defaultTitleFormat(values) {\n  const value = getFirstNonEmptyValue(values);\n  if (value) {\n    return {\n      title: \'x\',\n      value: value.x\n    };\n  }\n}',
        'computed': false
      }
    },
    'style': {
      'type': {
        'name': 'shape',
        'value': {
          'line': {
            'name': 'object',
            'required': false
          },
          'title': {
            'name': 'object',
            'required': false
          },
          'box': {
            'name': 'object',
            'required': false
          }
        }
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '{\n  line: {},\n  title: {},\n  box: {}\n}',
        'computed': false
      }
    }
  }
}, {
  'description': 'The Crosshair used by the XYChart as main tooltip mechanism along Y axis (horizontal).',
  'displayName': 'EuiCrosshairY',
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
    'name': '_computeDataFromYValue',
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
    'name': '_formatYValue',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'y',
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
    'name': '_handleNearestY',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'event',
      'type': null
    }],
    'returns': null
  }, {
    'name': '_findNearestYData',
    'docblock': '_findNearestYData - Find the nearest set of data in all existing series.\n\n@param  {type} dataSeries an array of dataseries\n@param  {type} mouseYContainerCoords the y coordinate of the mouse on the chart container\n@protected',
    'modifiers': [],
    'params': [{
      'name': 'dataSeries',
      'description': 'an array of dataseries',
      'type': {
        'name': 'type'
      }
    }, {
      'name': 'mouseYContainerCoords',
      'description': 'the y coordinate of the mouse on the chart container',
      'type': {
        'name': 'type'
      }
    }],
    'returns': null,
    'description': '_findNearestYData - Find the nearest set of data in all existing series.'
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