'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Legends;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _legend_item = require('./legend_item');

var _legend_item2 = _interopRequireDefault(_legend_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Title = function Title(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    { className: 'euiLegendTitle' },
    children
  );
};
var Container = function Container(_ref2) {
  var children = _ref2.children;
  return _react2.default.createElement(
    'div',
    { className: 'euiLegendContainer' },
    children
  );
};
var LegendContent = function LegendContent(_ref3) {
  var children = _ref3.children;
  return _react2.default.createElement(
    'div',
    { className: 'euiLegendContent' },
    children
  );
};
var TruncatedLabel = function TruncatedLabel(_ref4) {
  var children = _ref4.children;
  return _react2.default.createElement(
    'div',
    { className: 'euiLegendTruncatedLabel' },
    children
  );
};
var SeriesValue = function SeriesValue(_ref5) {
  var children = _ref5.children;
  return _react2.default.createElement(
    'div',
    { className: 'euiLegendSeriesValue' },
    children
  );
};
var MoreSeriesContainer = function MoreSeriesContainer(_ref6) {
  var children = _ref6.children;
  return _react2.default.createElement(
    'div',
    { className: 'euiLegendMoreSeriesContainer' },
    children
  );
};

function MoreSeries(_ref7) {
  var hiddenSeries = _ref7.hiddenSeries;

  if (hiddenSeries <= 0) {
    return null;
  }

  return _react2.default.createElement(
    MoreSeriesContainer,
    null,
    '(+',
    hiddenSeries,
    ')'
  );
}

function Legends(_ref8) {
  var chartTitle = _ref8.chartTitle,
      truncateLegends = _ref8.truncateLegends,
      series = _ref8.series,
      hiddenSeries = _ref8.hiddenSeries,
      clickLegend = _ref8.clickLegend,
      seriesVisibility = _ref8.seriesVisibility;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      Title,
      null,
      chartTitle
    ),
    _react2.default.createElement(
      Container,
      null,
      series.filter(function (serie) {
        return !serie.isEmpty;
      }).map(function (serie, i) {
        var text = _react2.default.createElement(
          LegendContent,
          null,
          truncateLegends ? _react2.default.createElement(
            TruncatedLabel,
            { title: serie.title },
            serie.title
          ) : serie.title,
          serie.legendValue && _react2.default.createElement(
            SeriesValue,
            null,
            serie.legendValue
          )
        );
        return _react2.default.createElement(_legend_item2.default, { key: i, onClick: function onClick() {
            return clickLegend(i);
          }, disabled: seriesVisibility[i], text: text, color: serie.color });
      }),
      _react2.default.createElement(MoreSeries, { hiddenSeries: hiddenSeries })
    )
  );
}
Legends.__docgenInfo = [{
  'description': '',
  'displayName': 'Legends',
  'methods': []
}];
module.exports = exports['default'];