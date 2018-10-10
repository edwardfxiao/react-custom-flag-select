'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STYLES = {};
try {
  STYLES = {
    'select__wrapper': 'react-custom-flag-select__select__wrapper___11lzY',
    'select__input': 'react-custom-flag-select__select__input___1s31X',
    'select__container': 'react-custom-flag-select__select__container___1WS3q',
    'error': 'react-custom-flag-select__error___DlrLx',
    'success': 'react-custom-flag-select__success___2PDN0',
    'disabled': 'react-custom-flag-select__disabled___1dmK6',
    'select__options-item': 'react-custom-flag-select__select__options-item___1CxfE',
    'select__options-item-show-cursor': 'react-custom-flag-select__select__options-item-show-cursor___3_qPb',
    'select__no-mouse': 'react-custom-flag-select__select__no-mouse___3KPrE',
    'select__hover-active': 'react-custom-flag-select__select__hover-active___2vlkC',
    'active': 'react-custom-flag-select__active___1tD_D',
    'select__options-container-animate': 'react-custom-flag-select__select__options-container-animate___uOOrw',
    'show': 'react-custom-flag-select__show___TghHg',
    'select__options-container': 'react-custom-flag-select__select__options-container___1IX1z',
    'select__dropdown': 'react-custom-flag-select__select__dropdown___3StfM',
    'select__dropdown-icon': 'react-custom-flag-select__select__dropdown-icon___2z384',
    'select__dropdown-icon-container': 'react-custom-flag-select__select__dropdown-icon-container___kW1px'
  };
} catch (ex) {}

var ERROR = 'Please provide valid optionList. i.e optionList=[{id: "1", name: "United States", flag: "us.svg"}, {id: "86", name: "中国", flag: "cn.svg"}]';

var ReactCustomFlagSelect = function (_Component) {
  _inherits(ReactCustomFlagSelect, _Component);

  function ReactCustomFlagSelect(props) {
    _classCallCheck(this, ReactCustomFlagSelect);

    var _this = _possibleConstructorReturn(this, (ReactCustomFlagSelect.__proto__ || Object.getPrototypeOf(ReactCustomFlagSelect)).call(this, props));

    _this.state = {
      value: props.value,
      show: false,
      isTyping: false,
      keycodeList: []
    };
    if (!props.optionList.length) {
      console.error(ERROR);
      return _possibleConstructorReturn(_this);
    } else {
      props.optionList.map(function (i) {
        if (typeof i.name == 'undefined' || typeof i.id == 'undefined') {
          console.error(ERROR);
        }
        return;
      });
    }
    _this.optionItems = [];
    _this.onChange = _this.onChange.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.pageClick = _this.pageClick.bind(_this);
    _this.onKeyPress = _this.onKeyPress.bind(_this);
    return _this;
  }

  _createClass(ReactCustomFlagSelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (document.addEventListener) {
        window.addEventListener('mousedown', this.pageClick, false);
        window.addEventListener('touchstart', this.pageClick, false);
      } else {
        document.attachEvent('onmousedown', this.pageClick);
        document.attachEvent('touchstart', this.pageClick);
      }
      this.wrapper.addEventListener('keydown', this.onKeyPress);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.show != this.state.show) {
        if (this.state.show) {
          this.resetCurrentFocus();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (document.removeEventListener) {
        window.removeEventListener('mousedown', this.pageClick, false);
        window.removeEventListener('touchstart', this.pageClick, false);
      } else {
        document.detachEvent('onmousedown', this.pageClick);
        document.detachEvent('touchstart', this.pageClick);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (String(this.props.value) != String(nextProps.value)) {
        this.setState({
          value: nextProps.value,
          err: false,
          successMsg: undefined
        });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(value, e) {
      var onChange = this.props.onChange;

      onChange && onChange(value, e);
      this.setState({ value: value });
    }
  }, {
    key: 'onClick',
    value: function onClick(e) {
      var onClick = this.props.onClick;

      onClick && onClick(e);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      var onBlur = this.props.onBlur;

      if (onBlur) {
        onBlur(e);
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus(e) {
      this.focus = true;
      var onFocus = this.props.onFocus;

      if (onFocus) {
        onFocus(e);
      }
    }
  }, {
    key: 'getIndex',
    value: function getIndex(list, val) {
      var key = -1;
      for (var i = 0; i < list.length; i++) {
        if (list[i].id == val) {
          key = i;
          break;
        }
      }
      return key;
    }
  }, {
    key: 'resetCurrentFocus',
    value: function resetCurrentFocus() {
      var value = this.state.value;
      var optionList = this.props.optionList;

      this.currentFocus = this.getIndex(optionList, value);
      this.scroll();
    }
  }, {
    key: 'onKeyPress',
    value: function onKeyPress(e) {
      this.setState({ isTyping: true });
      e.preventDefault();
      var _state = this.state,
          show = _state.show,
          value = _state.value;

      if (!show) {
        return;
      }
      var x = this.optionItems;
      var optionList = this.props.optionList;

      this.currentFocus = typeof this.currentFocus != 'undefined' ? this.currentFocus : this.getIndex(optionList, value);
      var direction = null;
      var keyCode = e.keyCode;

      var keyCodeEsc = 27;
      var keyCodeDown = 40;
      var keyCodeUp = 38;
      var keyCodeEnter = 13;
      var selectKeyList = [keyCodeEsc, keyCodeDown, keyCodeUp, keyCodeEnter];
      if (selectKeyList.indexOf(keyCode) != -1) {
        if (keyCode == keyCodeEsc) {
          this.setState({ show: false });
          this.resetCurrentFocus();
          return;
        }
        if (keyCode == keyCodeDown) {
          direction = 'down';
          this.currentFocus++;
          if (this.currentFocus > optionList.length - 1) {
            this.currentFocus = optionList.length - 1;
          }
          this.addActive();
        } else if (keyCode == keyCodeUp) {
          direction = 'up';
          this.currentFocus--;
          if (this.currentFocus < 0) {
            this.currentFocus = 0;
          }
          this.addActive();
        } else if (keyCode == keyCodeEnter) {
          e.preventDefault();
          if (this.currentFocus > -1) {
            if (x) x[this.currentFocus].click();
          }
        }
      } else {
        var keycodeList = this.state.keycodeList;

        if (!(keyCode >= 48 || keyCode <= 57 || keyCode >= 65 || keyCode <= 90 || keyCode >= 96 || keyCode <= 105)) {
          return;
        }
        this.setTimeoutTyping();
        var newkeyCodeList = [].concat(_toConsumableArray(keycodeList), [keyCode]);
        var str = String.fromCharCode.apply(String, _toConsumableArray(newkeyCodeList)).toLowerCase();
        var index = -1;
        optionList.filter(function (i, k) {
          var name = i.name,
              displayText = i.displayText;

          if (displayText) {
            if (displayText.toLowerCase().startsWith(str)) {
              if (index == -1) {
                index = k;
              }
            }
          } else {
            if (name.toLowerCase().startsWith(str)) {
              if (index == -1) {
                index = k;
              }
            }
          }
        });
        if (index != -1) {
          this.currentFocus = index;
          this.addActive();
        }
        this.setState({ keycodeList: newkeyCodeList });
      }
      this.scroll(direction);
    }
  }, {
    key: 'setTimeoutTyping',
    value: function setTimeoutTyping() {
      var _this2 = this;

      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }
      this.typingTimeout = setTimeout(function () {
        _this2.setState({ keycodeList: [] });
      }, 250);
    }
  }, {
    key: 'scroll',
    value: function scroll(direction) {
      var containerHeight = this.itemsWrapper.offsetHeight;
      var containerScrollTop = this.itemsWrapper.scrollTop;
      var itemHeight = this.optionItems[this.currentFocus].offsetHeight;
      if (direction) {
        if (direction == 'down') {
          var bound = containerScrollTop + containerHeight;
          var heightItems = this.currentFocus * itemHeight;
          var heightContainer = bound - itemHeight;
          if (heightItems >= heightContainer) {
            var offset = Math.abs(heightItems - heightContainer - itemHeight);
            if (offset >= 0 && !this.corrected) {
              this.itemsWrapper.scrollTop = containerScrollTop + itemHeight - offset;
              this.corrected = true;
            } else {
              this.itemsWrapper.scrollTop = containerScrollTop + itemHeight;
            }
          }
        }
        if (direction == 'up') {
          this.corrected = false;
          if (this.currentFocus * itemHeight <= containerScrollTop) {
            this.itemsWrapper.scrollTop = this.currentFocus * itemHeight;
          }
        }
      } else {
        this.corrected = false;
        this.itemsWrapper.scrollTop = this.currentFocus * itemHeight;
      }
    }
  }, {
    key: 'addActive',
    value: function addActive() {
      var x = this.optionItems;
      if (!x) return false;
      this.removeActive();
      if (this.currentFocus >= x.length) this.currentFocus = 0;
      if (this.currentFocus < 0) this.currentFocus = x.length - 1;
      var item = x[this.currentFocus];
      item.classList.add(STYLES['select__hover-active']);
    }
  }, {
    key: 'removeActive',
    value: function removeActive() {
      var x = this.optionItems;
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove(STYLES['select__hover-active']);
      }
    }
  }, {
    key: 'pageClick',
    value: function pageClick(e) {
      if (this.wrapper.contains(e.target)) {
        return;
      }
      if (this.focus) {
        this.onBlur();
        this.focus = false;
      }
      this.toggleShow(false);
    }
  }, {
    key: 'toggleShow',
    value: function toggleShow(show) {
      this.setState({ show: show });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          tabIndex = _props.tabIndex,
          id = _props.id,
          name = _props.name,
          optionList = _props.optionList,
          disabled = _props.disabled,
          classNameWrapper = _props.classNameWrapper,
          classNameContainer = _props.classNameContainer,
          classNameSelect = _props.classNameSelect,
          classNameOptionListContainer = _props.classNameOptionListContainer,
          classNameOptionListItem = _props.classNameOptionListItem,
          classNameDropdownIconOptionListItem = _props.classNameDropdownIconOptionListItem,
          customStyleWrapper = _props.customStyleWrapper,
          customStyleContainer = _props.customStyleContainer,
          customStyleSelect = _props.customStyleSelect,
          customStyleOptionListContainer = _props.customStyleOptionListContainer,
          customStyleOptionListItem = _props.customStyleOptionListItem,
          selectHtml = _props.selectHtml,
          selectOptionListItemHtml = _props.selectOptionListItemHtml;
      var _state2 = this.state,
          value = _state2.value,
          show = _state2.show,
          isTyping = _state2.isTyping;


      var wrapperClass = (0, _classnames2.default)(classNameWrapper, STYLES['select__wrapper'], disabled && STYLES['disabled']);

      var containerClass = (0, _classnames2.default)(classNameContainer, STYLES['select__container'], show && STYLES['show'], disabled && STYLES['disabled']);

      var inputClass = (0, _classnames2.default)(STYLES['select__input'], disabled && STYLES['disabled']);

      var selectClass = (0, _classnames2.default)(classNameSelect, STYLES['ellipsis'], STYLES['select__dropdown-menu'], disabled && STYLES['disabled']);

      var selectOptionListContainerClass = (0, _classnames2.default)(classNameOptionListContainer, STYLES['select__options-container'], show && STYLES['show'], disabled && STYLES['disabled']);

      var selectOptionListItemClass = (0, _classnames2.default)(!isTyping && STYLES['select__options-item-show-cursor'], classNameOptionListItem, STYLES['select__options-item'], disabled && STYLES['disabled']);

      var dropdownIconClass = (0, _classnames2.default)(classNameDropdownIconOptionListItem, STYLES['select__dropdown-icon']);

      var optionListHtml = void 0;
      var item = void 0;
      optionList.filter(function (i) {
        if (String(i.id) == String(value)) {
          item = i;
        }
      });
      if (optionList.length) {
        if (selectOptionListItemHtml) {
          optionListHtml = selectOptionListItemHtml;
        } else {
          optionListHtml = optionList.map(function (i, k) {
            return _react2.default.createElement(
              'div',
              {
                ref: function ref(_ref) {
                  return _this3.optionItems[k] = _ref;
                },
                onMouseOver: function onMouseOver() {
                  _this3.currentFocus = k;
                  _this3.addActive();
                },
                onMouseMove: function onMouseMove() {
                  _this3.setState({ isTyping: false });
                },
                onMouseOut: function onMouseOut() {
                  _this3.removeActive();
                },
                className: String(i.id) == String(value) ? selectOptionListItemClass + ' ' + STYLES['active'] : '' + selectOptionListItemClass,
                key: k,
                style: customStyleOptionListItem,
                onClick: function onClick(e) {
                  _this3.onChange(i.id, e);
                }
              },
              i.flag ? _react2.default.createElement(
                'div',
                { style: { width: '30%' } },
                _react2.default.createElement('img', { src: i.flag, style: { width: '100%', height: '100%', verticalAlign: 'middle' } })
              ) : '',
              _react2.default.createElement(
                'div',
                null,
                i.displayText ? i.displayText : i.name
              )
            );
          });
        }
      }
      var selectorHtml = selectHtml;
      var flagHtml = void 0;
      if (item.flag) {
        flagHtml = _react2.default.createElement(
          'div',
          { style: { width: '30%' } },
          _react2.default.createElement('img', { src: item.flag, style: { width: '100%', height: '100%', verticalAlign: 'middle' } })
        );
      }
      if (!selectorHtml) {
        selectorHtml = _react2.default.createElement(
          'div',
          { className: STYLES['select__dropdown'] },
          flagHtml,
          '\xA0',
          _react2.default.createElement(
            'div',
            { className: STYLES['ellipsis'] },
            item.id,
            '\xA0'
          ),
          _react2.default.createElement('div', { className: dropdownIconClass })
        );
      }
      return _react2.default.createElement(
        'div',
        {
          tabIndex: tabIndex,
          id: STYLES['select__wrapper'],
          className: wrapperClass,
          style: customStyleWrapper,
          onClick: function onClick(e) {
            _this3.onClick(e);
            !disabled ? _this3.toggleShow(!show) : '';
          },
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          ref: function ref(_ref4) {
            return _this3.wrapper = _ref4;
          }
        },
        _react2.default.createElement(
          'div',
          { className: containerClass, style: customStyleContainer },
          _react2.default.createElement('input', { id: id, name: name, type: 'hidden', value: value, className: inputClass, onChange: function onChange() {}, ref: function ref(_ref2) {
              return _this3.input = _ref2;
            } }),
          _react2.default.createElement(
            'div',
            { className: selectClass, style: customStyleSelect },
            selectorHtml
          ),
          _react2.default.createElement(
            'div',
            { ref: function ref(_ref3) {
                return _this3.itemsWrapper = _ref3;
              }, className: selectOptionListContainerClass, style: customStyleOptionListContainer },
            optionListHtml
          )
        )
      );
    }
  }]);

  return ReactCustomFlagSelect;
}(_react.Component);

ReactCustomFlagSelect.defaultProps = {
  tabIndex: -1,
  id: '',
  name: '',
  value: '',
  disabled: false,
  optionList: [],
  classNameWrapper: '',
  classNameContainer: '',
  classNameOptionListItem: '',
  classNameOptionListContainer: '',
  classNameDropdownIconOptionListItem: '',
  customStyleWrapper: {},
  customStyleContainer: {},
  customStyleSelect: {},
  customStyleOptionListItem: {},
  customStyleOptionListContainer: {},
  customStyleDropdownIcon: {},
  onChange: function onChange() {}
};

ReactCustomFlagSelect.propTypes = {
  tabIndex: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  id: _propTypes2.default.string,
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  disabled: _propTypes2.default.bool,
  validate: _propTypes2.default.bool,
  optionList: _propTypes2.default.array.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onClick: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  validationOption: _propTypes2.default.object,
  locale: _propTypes2.default.string,
  selectHtml: _propTypes2.default.element,
  selectOptionListItemHtml: _propTypes2.default.array,
  classNameWrapper: _propTypes2.default.string,
  classNameContainer: _propTypes2.default.string,
  classNameSelect: _propTypes2.default.string,
  classNameOptionListContainer: _propTypes2.default.string,
  classNameDropdownIconOptionListItem: _propTypes2.default.string,
  classNameOptionListItem: _propTypes2.default.string,
  customStyleWrapper: _propTypes2.default.object,
  customStyleContainer: _propTypes2.default.object,
  customStyleSelect: _propTypes2.default.object,
  customStyleOptionListContainer: _propTypes2.default.object,
  customStyleDropdownIcon: _propTypes2.default.object,
  customStyleOptionListItem: _propTypes2.default.object
};

exports.default = ReactCustomFlagSelect;