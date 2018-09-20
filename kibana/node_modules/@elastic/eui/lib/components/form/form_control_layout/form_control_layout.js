'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFormControlLayout = exports.ICON_SIDES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _form_control_layout_icons = require('./form_control_layout_icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ICON_SIDES = exports.ICON_SIDES = ['left', 'right'];

var EuiFormControlLayout = exports.EuiFormControlLayout = function (_Component) {
  _inherits(EuiFormControlLayout, _Component);

  function EuiFormControlLayout() {
    _classCallCheck(this, EuiFormControlLayout);

    return _possibleConstructorReturn(this, (EuiFormControlLayout.__proto__ || Object.getPrototypeOf(EuiFormControlLayout)).apply(this, arguments));
  }

  _createClass(EuiFormControlLayout, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          icon = _props.icon,
          clear = _props.clear,
          fullWidth = _props.fullWidth,
          isLoading = _props.isLoading,
          compressed = _props.compressed,
          className = _props.className,
          prepend = _props.prepend,
          append = _props.append,
          rest = _objectWithoutProperties(_props, ['children', 'icon', 'clear', 'fullWidth', 'isLoading', 'compressed', 'className', 'prepend', 'append']);

      var classes = (0, _classnames2.default)('euiFormControlLayout', {
        'euiFormControlLayout--fullWidth': fullWidth,
        'euiFormControlLayout--compressed': compressed,
        'euiFormControlLayout--group': prepend || append
      }, className);

      var prependNodes = this.renderPrepends();
      var appendNodes = this.renderAppends();

      var clonedChildren = void 0;
      if ((prepend || append) && children) {
        clonedChildren = (0, _react.cloneElement)(children, {
          className: children.props.className + ' euiFormControlLayout__child--noStyle'
        });
      }

      return _react2.default.createElement(
        'div',
        _extends({ className: classes }, rest),
        prependNodes,
        _react2.default.createElement(
          'div',
          { className: 'euiFormControlLayout__childrenWrapper' },
          clonedChildren || children,
          _react2.default.createElement(_form_control_layout_icons.EuiFormControlLayoutIcons, {
            icon: icon,
            clear: clear,
            isLoading: isLoading
          })
        ),
        appendNodes
      );
    }
  }, {
    key: 'renderPrepends',
    value: function renderPrepends() {
      var _this2 = this;

      var prepend = this.props.prepend;


      if (!prepend) {
        return;
      }

      var prependNodes = void 0;

      if (Array.isArray(prepend)) {
        prependNodes = prepend.map(function (item, index) {
          return _this2.createSideNode(item, 'prepend', index);
        });
      } else {
        prependNodes = this.createSideNode(prepend, 'prepend');
      }

      return prependNodes;
    }
  }, {
    key: 'renderAppends',
    value: function renderAppends() {
      var _this3 = this;

      var append = this.props.append;


      if (!append) {
        return;
      }

      var appendNodes = void 0;

      if (Array.isArray(append)) {
        appendNodes = append.map(function (item, index) {
          return _this3.createSideNode(item, 'append', index);
        });
      } else {
        appendNodes = this.createSideNode(append, 'append');
      }

      return appendNodes;
    }
  }, {
    key: 'createSideNode',
    value: function createSideNode(node, side, key) {
      return (0, _react.cloneElement)(node, {
        className: 'euiFormControlLayout__' + side,
        key: key
      });
    }
  }]);

  return EuiFormControlLayout;
}(_react.Component);

EuiFormControlLayout.propTypes = {
  children: _propTypes2.default.node,
  icon: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    type: _propTypes2.default.string,
    side: _propTypes2.default.oneOf(ICON_SIDES),
    onClick: _propTypes2.default.func
  })]),
  clear: _propTypes2.default.shape({
    onClick: _propTypes2.default.func
  }),
  fullWidth: _propTypes2.default.bool,
  isLoading: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  compressed: _propTypes2.default.bool,
  /**
   * Creates an input group with element(s) coming before children
   */
  prepend: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.arrayOf(_propTypes2.default.node)]),
  /**
   * Creates an input group with element(s) coming after children
   */
  append: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.arrayOf(_propTypes2.default.node)])
};

EuiFormControlLayout.defaultProps = {
  isLoading: false,
  compressed: false
};
EuiFormControlLayout.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiFormControlLayout',
  'methods': [{
    'name': 'renderPrepends',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'renderAppends',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'createSideNode',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'node',
      'type': null
    }, {
      'name': 'side',
      'type': null
    }, {
      'name': 'key',
      'type': null
    }],
    'returns': null
  }],
  'props': {
    'children': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': ''
    },
    'icon': {
      'type': {
        'name': 'union',
        'value': [{
          'name': 'string'
        }, {
          'name': 'shape',
          'value': {
            'type': {
              'name': 'string',
              'required': false
            },
            'side': {
              'name': 'enum',
              'value': [{
                'value': '\'left\'',
                'computed': false
              }, {
                'value': '\'right\'',
                'computed': false
              }],
              'required': false
            },
            'onClick': {
              'name': 'func',
              'required': false
            }
          }
        }]
      },
      'required': false,
      'description': ''
    },
    'clear': {
      'type': {
        'name': 'shape',
        'value': {
          'onClick': {
            'name': 'func',
            'required': false
          }
        }
      },
      'required': false,
      'description': ''
    },
    'fullWidth': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': ''
    },
    'isLoading': {
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
    'className': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
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
    'prepend': {
      'type': {
        'name': 'union',
        'value': [{
          'name': 'node'
        }, {
          'name': 'arrayOf',
          'value': {
            'name': 'node'
          }
        }]
      },
      'required': false,
      'description': 'Creates an input group with element(s) coming before children'
    },
    'append': {
      'type': {
        'name': 'union',
        'value': [{
          'name': 'node'
        }, {
          'name': 'arrayOf',
          'value': {
            'name': 'node'
          }
        }]
      },
      'required': false,
      'description': 'Creates an input group with element(s) coming after children'
    }
  }
}];