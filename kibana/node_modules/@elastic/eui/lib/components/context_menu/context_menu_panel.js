'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiContextMenuPanel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tabbable = require('tabbable');

var _tabbable2 = _interopRequireDefault(_tabbable);

var _icon = require('../icon');

var _popover = require('../popover');

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var transitionDirectionAndTypeToClassNameMap = {
  next: {
    in: 'euiContextMenuPanel-txInLeft',
    out: 'euiContextMenuPanel-txOutLeft'
  },
  previous: {
    in: 'euiContextMenuPanel-txInRight',
    out: 'euiContextMenuPanel-txOutRight'
  }
};

var EuiContextMenuPanel = exports.EuiContextMenuPanel = function (_Component) {
  _inherits(EuiContextMenuPanel, _Component);

  function EuiContextMenuPanel(props) {
    _classCallCheck(this, EuiContextMenuPanel);

    var _this = _possibleConstructorReturn(this, (EuiContextMenuPanel.__proto__ || Object.getPrototypeOf(EuiContextMenuPanel)).call(this, props));

    _this.incrementFocusedItemIndex = function (amount) {
      var nextFocusedItemIndex = void 0;

      if (_this.state.focusedItemIndex === undefined) {
        // If this is the beginning of the user's keyboard navigation of the menu, then we'll focus
        // either the first or last item.
        nextFocusedItemIndex = amount < 0 ? _this.state.menuItems.length - 1 : 0;
      } else {
        nextFocusedItemIndex = _this.state.focusedItemIndex + amount;

        if (nextFocusedItemIndex < 0) {
          nextFocusedItemIndex = _this.state.menuItems.length - 1;
        } else if (nextFocusedItemIndex === _this.state.menuItems.length) {
          nextFocusedItemIndex = 0;
        }
      }

      _this.setState({
        focusedItemIndex: nextFocusedItemIndex
      });
    };

    _this.onKeyDown = function (e) {
      // If this panel contains items you can use the left arrow key to go back at any time.
      // But if it doesn't contain items, then you have to focus on the back button specifically,
      // since there could be content inside the panel which requires use of the left arrow key,
      // e.g. text inputs.
      if (_this.props.items.length || document.activeElement === _this.backButton || document.activeElement === _this.panel) {
        if (e.keyCode === _services.cascadingMenuKeyCodes.LEFT) {
          if (_this.props.showPreviousPanel) {
            e.preventDefault();
            e.stopPropagation();
            _this.props.showPreviousPanel();

            if (_this.props.onUseKeyboardToNavigate) {
              _this.props.onUseKeyboardToNavigate();
            }
          }
        }
      }

      if (_this.props.items.length) {
        switch (e.keyCode) {
          case _services.cascadingMenuKeyCodes.TAB:
            // We need to sync up with the user if s/he is tabbing through the items.
            var focusedItemIndex = _this.state.menuItems.indexOf(document.activeElement);

            _this.setState({
              focusedItemIndex: focusedItemIndex >= 0 && focusedItemIndex < _this.state.menuItems.length ? focusedItemIndex : undefined
            });
            break;

          case _services.cascadingMenuKeyCodes.UP:
            e.preventDefault();
            _this.incrementFocusedItemIndex(-1);

            if (_this.props.onUseKeyboardToNavigate) {
              _this.props.onUseKeyboardToNavigate();
            }
            break;

          case _services.cascadingMenuKeyCodes.DOWN:
            e.preventDefault();
            _this.incrementFocusedItemIndex(1);

            if (_this.props.onUseKeyboardToNavigate) {
              _this.props.onUseKeyboardToNavigate();
            }
            break;

          case _services.cascadingMenuKeyCodes.RIGHT:
            if (_this.props.showNextPanel) {
              e.preventDefault();
              _this.props.showNextPanel(_this.state.focusedItemIndex);

              if (_this.props.onUseKeyboardToNavigate) {
                _this.props.onUseKeyboardToNavigate();
              }
            }
            break;

          default:
            break;
        }
      }
    };

    _this.onTransitionComplete = function () {
      _this.setState({
        isTransitioning: false
      });

      if (_this.props.onTransitionComplete) {
        _this.props.onTransitionComplete();
      }
    };

    _this.menuItemRef = function (index, node) {
      // There's a weird bug where if you navigate to a panel without items, then this callback
      // is still invoked, so we have to do a truthiness check.
      if (node) {
        // Store all menu items.
        _this.state.menuItems[index] = node;
      }
    };

    _this.panelRef = function (node) {
      _this.panel = node;

      _this.updateHeight();
    };

    _this.contentRef = function (node) {
      _this.content = node;
    };

    _this.state = {
      prevProps: {
        items: _this.props.items
      },
      menuItems: [],
      isTransitioning: Boolean(props.transitionType),
      focusedItemIndex: props.initialFocusedItemIndex,
      currentHeight: undefined
    };
    return _this;
  }

  _createClass(EuiContextMenuPanel, [{
    key: 'updateFocus',
    value: function updateFocus() {
      var _this2 = this;

      // Give positioning time to render before focus is applied. Otherwise page jumps.
      requestAnimationFrame(function () {
        if (!_this2._isMounted) {
          return;
        }

        // If this panel has lost focus, then none of its content should be focused.
        if (!_this2.props.hasFocus) {
          if (_this2.panel.contains(document.activeElement)) {
            document.activeElement.blur();
          }
          return;
        }

        // Setting focus while transitioning causes the animation to glitch, so we have to wait
        // until it's finished before we focus anything.
        if (_this2.state.isTransitioning) {
          return;
        }

        // If there aren't any items then this is probably a form or something.
        if (!_this2.state.menuItems.length) {
          // If we've already focused on something inside the panel, everything's fine.
          if (_this2.panel.contains(document.activeElement)) {
            return;
          }

          // Otherwise let's focus the first tabbable item and expedite input from the user.
          if (_this2.content) {
            var tabbableItems = (0, _tabbable2.default)(_this2.content);
            if (tabbableItems.length) {
              tabbableItems[0].focus();
            }
          }
          return;
        }

        // If an item is focused, focus it.
        if (_this2.state.focusedItemIndex !== undefined) {
          _this2.state.menuItems[_this2.state.focusedItemIndex].focus();
          return;
        }

        // Focus on the panel as a last resort.
        if (!_this2.panel.contains(document.activeElement)) {
          _this2.panel.focus();
        }
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateFocus();
      this._isMounted = true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: 'getWatchedPropsForItems',
    value: function getWatchedPropsForItems(items) {
      // This lets us compare prevProps and nextProps among items so we can re-render if our items
      // have changed.
      var watchedItemProps = this.props.watchedItemProps;

      // Create fingerprint of all item's watched properties

      if (items.length && watchedItemProps && watchedItemProps.length) {
        return JSON.stringify(items.map(function (item) {
          // Create object of item properties and values
          var props = {
            key: item.key
          };
          watchedItemProps.forEach(function (prop) {
            return props[prop] = item.props[prop];
          });
          return props;
        }));
      }

      return null;
    }
  }, {
    key: 'didItemsChange',
    value: function didItemsChange(prevItems, nextItems) {
      // If the count of items has changed then update
      if (prevItems.length !== nextItems.length) {
        return true;
      }

      // Check if any watched item properties changed by quick string comparison
      if (this.getWatchedPropsForItems(nextItems) !== this.getWatchedPropsForItems(prevItems)) {
        return true;
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      // Prevent calling `this.updateFocus()` below if we don't have to.
      if (nextProps.hasFocus !== this.props.hasFocus) {
        return true;
      }

      if (nextState.isTransitioning !== this.state.isTransitioning) {
        return true;
      }

      if (nextState.focusedItemIndex !== this.state.focusedItemIndex) {
        return true;
      }

      // **
      // this component should have either items or children,
      // if there are items we can determine via `watchedItemProps` if we should update
      // if there are children we can't know if they have changed so return true
      // **

      if (this.props.items.length > 0 || nextProps.items.length > 0) {
        if (this.didItemsChange(this.props.items, nextProps.items)) {
          return true;
        }
      }

      // it's not possible (in any good way) to know if `children` has changed, assume they might have
      if (this.props.children != null) {
        return true;
      }

      return false;
    }
  }, {
    key: 'updateHeight',
    value: function updateHeight() {
      var currentHeight = this.panel ? this.panel.clientHeight : 0;

      if (this.state.height !== currentHeight) {
        if (this.props.onHeightChange) {
          this.props.onHeightChange(currentHeight);

          this.setState({ height: currentHeight });
        }
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.items.length > 0 || this.props.items.length > 0) {
        // content comes from items
        if (this.didItemsChange(prevProps.items, this.props.items)) {
          this.updateHeight();
        }
      } else {
        // content comes from children
        this.updateHeight();
      }

      this.updateFocus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          onClose = _props.onClose,
          title = _props.title,
          onHeightChange = _props.onHeightChange,
          transitionType = _props.transitionType,
          transitionDirection = _props.transitionDirection,
          onTransitionComplete = _props.onTransitionComplete,
          onUseKeyboardToNavigate = _props.onUseKeyboardToNavigate,
          hasFocus = _props.hasFocus,
          items = _props.items,
          watchedItemProps = _props.watchedItemProps,
          initialFocusedItemIndex = _props.initialFocusedItemIndex,
          showNextPanel = _props.showNextPanel,
          showPreviousPanel = _props.showPreviousPanel,
          rest = _objectWithoutProperties(_props, ['children', 'className', 'onClose', 'title', 'onHeightChange', 'transitionType', 'transitionDirection', 'onTransitionComplete', 'onUseKeyboardToNavigate', 'hasFocus', 'items', 'watchedItemProps', 'initialFocusedItemIndex', 'showNextPanel', 'showPreviousPanel']);

      var panelTitle = void 0;

      if (title) {
        if (Boolean(onClose)) {
          panelTitle = _react2.default.createElement(
            'button',
            {
              className: 'euiContextMenuPanelTitle',
              type: 'button',
              onClick: onClose,
              ref: function ref(node) {
                _this3.backButton = node;
              },
              'data-test-subj': 'contextMenuPanelTitleButton'
            },
            _react2.default.createElement(
              'span',
              { className: 'euiContextMenu__itemLayout' },
              _react2.default.createElement(_icon.EuiIcon, {
                type: 'arrowLeft',
                size: 'm',
                className: 'euiContextMenu__icon'
              }),
              _react2.default.createElement(
                'span',
                { className: 'euiContextMenu__text' },
                title
              )
            )
          );
        } else {
          panelTitle = _react2.default.createElement(
            _popover.EuiPopoverTitle,
            null,
            _react2.default.createElement(
              'span',
              { className: 'euiContextMenu__itemLayout' },
              title
            )
          );
        }
      }

      var classes = (0, _classnames2.default)('euiContextMenuPanel', className, this.state.isTransitioning && transitionDirectionAndTypeToClassNameMap[transitionDirection] ? transitionDirectionAndTypeToClassNameMap[transitionDirection][transitionType] : undefined);

      var content = items.length ? items.map(function (MenuItem, index) {
        return (0, _react.cloneElement)(MenuItem, {
          buttonRef: _this3.menuItemRef.bind(_this3, index)
        });
      }) : children;

      return _react2.default.createElement(
        'div',
        _extends({
          ref: this.panelRef,
          className: classes,
          onKeyDown: this.onKeyDown,
          tabIndex: '0',
          onAnimationEnd: this.onTransitionComplete
        }, rest),
        panelTitle,
        _react2.default.createElement(
          'div',
          { ref: this.contentRef },
          content
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var needsUpdate = false;
      var nextState = {};

      // Clear refs to menuItems if we're getting new ones.
      if (nextProps.items !== prevState.prevProps.items) {
        needsUpdate = true;
        nextState.menuItems = [];
        nextState.prevProps = { items: nextProps.items };
      }

      if (nextProps.transitionType) {
        needsUpdate = true;
        nextState.isTransitioning = true;
      }

      if (needsUpdate) {
        return nextState;
      }
      return null;
    }
  }]);

  return EuiContextMenuPanel;
}(_react.Component);

EuiContextMenuPanel.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  title: _propTypes2.default.node,
  onClose: _propTypes2.default.func,
  onHeightChange: _propTypes2.default.func,
  transitionType: _propTypes2.default.oneOf(['in', 'out']),
  transitionDirection: _propTypes2.default.oneOf(['next', 'previous']),
  onTransitionComplete: _propTypes2.default.func,
  onUseKeyboardToNavigate: _propTypes2.default.func,
  hasFocus: _propTypes2.default.bool,
  items: _propTypes2.default.array,
  watchedItemProps: _propTypes2.default.array,
  showNextPanel: _propTypes2.default.func,
  showPreviousPanel: _propTypes2.default.func,
  initialFocusedItemIndex: _propTypes2.default.number
};
EuiContextMenuPanel.defaultProps = {
  hasFocus: true,
  items: []
};
EuiContextMenuPanel.__docgenInfo = [{
  'description': '',
  'displayName': 'EuiContextMenuPanel',
  'methods': [{
    'name': 'incrementFocusedItemIndex',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'amount',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'onKeyDown',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'e',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'updateFocus',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'onTransitionComplete',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'getDerivedStateFromProps',
    'docblock': null,
    'modifiers': ['static'],
    'params': [{
      'name': 'nextProps',
      'type': null
    }, {
      'name': 'prevState',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'getWatchedPropsForItems',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'items',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'didItemsChange',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'prevItems',
      'type': null
    }, {
      'name': 'nextItems',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'updateHeight',
    'docblock': null,
    'modifiers': [],
    'params': [],
    'returns': null
  }, {
    'name': 'menuItemRef',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'index',
      'type': null
    }, {
      'name': 'node',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'panelRef',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'node',
      'type': null
    }],
    'returns': null
  }, {
    'name': 'contentRef',
    'docblock': null,
    'modifiers': [],
    'params': [{
      'name': 'node',
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
    'className': {
      'type': {
        'name': 'string'
      },
      'required': false,
      'description': ''
    },
    'title': {
      'type': {
        'name': 'node'
      },
      'required': false,
      'description': ''
    },
    'onClose': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'onHeightChange': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'transitionType': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '\'in\'',
          'computed': false
        }, {
          'value': '\'out\'',
          'computed': false
        }]
      },
      'required': false,
      'description': ''
    },
    'transitionDirection': {
      'type': {
        'name': 'enum',
        'value': [{
          'value': '\'next\'',
          'computed': false
        }, {
          'value': '\'previous\'',
          'computed': false
        }]
      },
      'required': false,
      'description': ''
    },
    'onTransitionComplete': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'onUseKeyboardToNavigate': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'hasFocus': {
      'type': {
        'name': 'bool'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': 'true',
        'computed': false
      }
    },
    'items': {
      'type': {
        'name': 'array'
      },
      'required': false,
      'description': '',
      'defaultValue': {
        'value': '[]',
        'computed': false
      }
    },
    'watchedItemProps': {
      'type': {
        'name': 'array'
      },
      'required': false,
      'description': ''
    },
    'showNextPanel': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'showPreviousPanel': {
      'type': {
        'name': 'func'
      },
      'required': false,
      'description': ''
    },
    'initialFocusedItemIndex': {
      'type': {
        'name': 'number'
      },
      'required': false,
      'description': ''
    }
  }
}];