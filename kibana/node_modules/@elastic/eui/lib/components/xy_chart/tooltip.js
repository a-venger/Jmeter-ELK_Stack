'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Tooltip;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactVis = require('react-vis');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// import {
//   colors,
//   unit,
//   units,
//   px,
//   borderRadius,
//   fontSize,
//   fontSizes
// } from '../../variables';
// import Legend from '../../Legend/Legend';

// const TooltipElm = styled.div`
//   margin: 0 ${px(unit)};
//   transform: translateY(-50%);
//   border: 1px solid ${colors.gray4};
//   background: ${colors.white};
//   border-radius: ${borderRadius};
//   font-size: ${fontSize};
//   color: ${colors.black};
// `;

// const Header = styled.div`
//   background: ${colors.gray5};
//   border-bottom: 1px solid ${colors.gray4};
//   border-radius: ${borderRadius} ${borderRadius} 0 0;
//   padding: ${px(units.half)};
//   color: ${colors.gray3};
// `;

// const Legends = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: ${px(units.half)};
//   padding: ${px(units.quarter)} ${px(unit)} ${px(units.quarter)}
//     ${px(units.half)};
//   font-size: ${fontSizes.small};
// `;

// const LegendContainer = styled.div`
//   display: flex;
//   align-items: center;
//   margin: ${px(units.quarter)} 0;
//   justify-content: space-between;
// `;

// const LegendGray = styled(Legend)`
//   color: ${colors.gray3};
// `;

// const Value = styled.div`
//   color: ${colors.gray2};
//   font-size: ${fontSize};
// `;

// <TooltipElm>
//     <Header>{header || moment(x).format('MMMM Do YYYY, HH:mm')}</Header>
//     <Legends>
//     {tooltipPoints.map((point, i) => (
//         <LegendContainer key={i}>
//         <LegendGray fontSize={fontSize.tiny} radius={units.half} color={point.color} text={point.text} />
//         <Value>{point.value}</Value>
//       </LegendContainer>
//     ))}
//   </Legends>
//   </TooltipElm>;

function Tooltip(_ref) {
  var tooltipPoints = _ref.tooltipPoints,
      x = _ref.x,
      y = _ref.y,
      props = _objectWithoutProperties(_ref, ['tooltipPoints', 'x', 'y']);

  if (_lodash2.default.isEmpty(tooltipPoints)) {
    return null;
  }
  return _react2.default.createElement(_reactVis.Hint, _extends({}, props, { value: { x: x, y: y } }));
}

Tooltip.propTypes = {
  header: _propTypes2.default.string,
  tooltipPoints: _propTypes2.default.array.isRequired,
  x: _propTypes2.default.number,
  y: _propTypes2.default.number
};

Tooltip.defaultProps = {};
Tooltip.__docgenInfo = [{
  'description': '',
  'displayName': 'Tooltip',
  'methods': [],
  'props': {
    'header': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'tooltipPoints': {
      'type': {
        'name': 'array'
      },
      'required': true,
      'description': ''
    },
    'x': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': ''
    },
    'y': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': ''
    }
  }
}];
module.exports = exports['default'];