"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getIndex = exports.getItem = void 0;

var _react = _interopRequireWildcard(require("react"));

var _utils = require("./utils.js");

var _reactCustomFlagSelectCss = _interopRequireDefault(require("./react-custom-flag-select.css.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// BUILD PRODUCTION
// import STYLES from './react-custom-flag-select.css';
var TYPE = 'select';
var globalVariableIsFocusing = false;
var globalVariableIsCorrected = false;
var globalVariableCurrentFocus = null;
var globalVariableTypingTimeout = null;

var getItem = function getItem(list, value) {
  var res = null;

  if (list.length) {
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].id === value) {
        res = list[i];
        break;
      }
    }
  }

  return res;
};

exports.getItem = getItem;

var getIndex = function getIndex(list, value) {
  var key = -1;

  for (var i = 0; i < list.length; i += 1) {
    if (list[i].id === value) {
      key = i;
      break;
    }
  }

  return key;
};

exports.getIndex = getIndex;
var DEFAULT_ID = (0, _utils.getRandomId)();
var Index = (0, _react.memo)(function (_ref) {
  var _ref$tabIndex = _ref.tabIndex,
      tabIndex = _ref$tabIndex === void 0 ? null : _ref$tabIndex,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? DEFAULT_ID : _ref$id,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? '' : _ref$name,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      _ref$animate = _ref.animate,
      animate = _ref$animate === void 0 ? false : _ref$animate,
      _ref$optionList = _ref.optionList,
      optionList = _ref$optionList === void 0 ? [] : _ref$optionList,
      _ref$classNameWrapper = _ref.classNameWrapper,
      classNameWrapper = _ref$classNameWrapper === void 0 ? '' : _ref$classNameWrapper,
      _ref$classNameContain = _ref.classNameContainer,
      classNameContainer = _ref$classNameContain === void 0 ? '' : _ref$classNameContain,
      _ref$classNameSelect = _ref.classNameSelect,
      classNameSelect = _ref$classNameSelect === void 0 ? '' : _ref$classNameSelect,
      _ref$classNameOptionL = _ref.classNameOptionListItem,
      classNameOptionListItem = _ref$classNameOptionL === void 0 ? '' : _ref$classNameOptionL,
      _ref$classNameOptionL2 = _ref.classNameOptionListContainer,
      classNameOptionListContainer = _ref$classNameOptionL2 === void 0 ? '' : _ref$classNameOptionL2,
      _ref$classNameDropdow = _ref.classNameDropdownIconOptionListItem,
      classNameDropdownIconOptionListItem = _ref$classNameDropdow === void 0 ? '' : _ref$classNameDropdow,
      _ref$customStyleWrapp = _ref.customStyleWrapper,
      customStyleWrapper = _ref$customStyleWrapp === void 0 ? {} : _ref$customStyleWrapp,
      _ref$customStyleConta = _ref.customStyleContainer,
      customStyleContainer = _ref$customStyleConta === void 0 ? {} : _ref$customStyleConta,
      _ref$customStyleSelec = _ref.customStyleSelect,
      customStyleSelect = _ref$customStyleSelec === void 0 ? {} : _ref$customStyleSelec,
      _ref$customStyleOptio = _ref.customStyleOptionListItem,
      customStyleOptionListItem = _ref$customStyleOptio === void 0 ? {} : _ref$customStyleOptio,
      _ref$customStyleOptio2 = _ref.customStyleOptionListContainer,
      customStyleOptionListContainer = _ref$customStyleOptio2 === void 0 ? {} : _ref$customStyleOptio2,
      _ref$selectHtml = _ref.selectHtml,
      selectHtml = _ref$selectHtml === void 0 ? null : _ref$selectHtml,
      _ref$selectOptionList = _ref.selectOptionListItemHtml,
      selectOptionListItemHtml = _ref$selectOptionList === void 0 ? null : _ref$selectOptionList,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange,
      _ref$onBlur = _ref.onBlur,
      onBlur = _ref$onBlur === void 0 ? null : _ref$onBlur,
      _ref$onFocus = _ref.onFocus,
      onFocus = _ref$onFocus === void 0 ? null : _ref$onFocus,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? null : _ref$onClick;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      show = _useState2[0],
      setShow = _useState2[1];

  var _useState3 = (0, _react.useState)(String(value)),
      _useState4 = _slicedToArray(_useState3, 2),
      internalValue = _useState4[0],
      setInternalValue = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      keycodeList = _useState6[0],
      setKeycodeList = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isTyping = _useState8[0],
      setIsTyping = _useState8[1];

  var $wrapper = (0, _react.useRef)(null);
  var $itemsWrapper = (0, _react.useRef)(null);
  var $itemsRef = [];

  if (optionList.length) {
    for (var i = 0; i < optionList.length; i += 1) {
      $itemsRef.push((0, _react.useRef)(null));
    }
  }

  var handleOnBlur = (0, _react.useCallback)(function (e) {
    if (onBlur) {
      onBlur(e);
    }
  }, [internalValue]);
  var handleOnFocus = (0, _react.useCallback)(function (e) {
    if (onFocus) {
      onFocus(e);
    }
  }, []);
  var handleOnClick = (0, _react.useCallback)(function (e) {
    if (onClick) {
      onClick(e);
    }
  }, []);
  var handleOnChange = (0, _react.useCallback)(function (val, e) {
    if (disabled || $wrapper === null) {
      return;
    }

    setInternalValue(val);
    onChange && onChange(val, e);
  }, []);
  /* istanbul ignore next because of https://github.com/airbnb/enzyme/issues/441 && https://github.com/airbnb/enzyme/blob/master/docs/future.md */

  (0, _react.useEffect)(function () {
    if ($wrapper === null) {
      return;
    }

    window.addEventListener('mousedown', pageClick);
    window.addEventListener('touchstart', pageClick);

    if (tabIndex) {
      $wrapper.current.setAttribute('tabindex', String(tabIndex));
    }

    if (id) {
      $wrapper.current.setAttribute('id', String(id));
    }

    return function () {
      window.removeEventListener('mousedown', pageClick);
      window.removeEventListener('touchstart', pageClick);
      $wrapper.current.removeEventListener('keydown', onKeyDown);
    };
  }, []);
  /* istanbul ignore next because of https://github.com/airbnb/enzyme/issues/441 && https://github.com/airbnb/enzyme/blob/master/docs/future.md */

  var pageClick = (0, _react.useCallback)(function (e) {
    if ($wrapper === null || $wrapper.current.contains(e.target)) {
      return;
    }

    if (globalVariableIsFocusing) {
      handleOnBlur(e);
      globalVariableIsFocusing = false;
    }

    setShow(false);
  }, []);
  /* istanbul ignore next because of https://github.com/airbnb/enzyme/issues/441 && https://github.com/airbnb/enzyme/blob/master/docs/future.md */

  var resetCurrentFocus = (0, _react.useCallback)(function () {
    globalVariableCurrentFocus = getIndex(optionList, internalValue);
    scroll();
  }, [internalValue]);
  /* istanbul ignore next because of https://github.com/airbnb/enzyme/issues/441 && https://github.com/airbnb/enzyme/blob/master/docs/future.md */

  var setTimeoutTyping = (0, _react.useCallback)(function () {
    if (globalVariableTypingTimeout) {
      clearTimeout(globalVariableTypingTimeout);
    }

    globalVariableTypingTimeout = setTimeout(function () {
      setKeycodeList([]);
    }, 250);
  }, []);
  /* istanbul ignore next because of https://github.com/airbnb/enzyme/issues/441 && https://github.com/airbnb/enzyme/blob/master/docs/future.md */

  var scroll = (0, _react.useCallback)(function () {
    var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

    if ($itemsWrapper === null) {
      return;
    }

    var containerHeight = $itemsWrapper.current.offsetHeight;
    var containerScrollTop = $itemsWrapper.current.scrollTop;

    if (!globalVariableCurrentFocus || !$itemsRef[globalVariableCurrentFocus]) {
      return;
    }

    if ($itemsRef[globalVariableCurrentFocus] === null) {
      return;
    }

    var itemHeight = $itemsRef[globalVariableCurrentFocus].current.offsetHeight;

    if (direction) {
      if (direction === 'down') {
        var bound = containerScrollTop + containerHeight;
        var heightItems = globalVariableCurrentFocus * itemHeight;
        var heightContainer = bound - itemHeight;

        if (heightItems >= heightContainer) {
          var offset = Math.abs(heightItems - heightContainer - itemHeight);

          if (offset >= 0 && !globalVariableIsCorrected) {
            $itemsWrapper.current.scrollTop = containerScrollTop + itemHeight - offset;
            globalVariableIsCorrected = true;
          } else {
            $itemsWrapper.current.scrollTop = containerScrollTop + itemHeight;
          }
        }
      }

      if (direction === 'up') {
        globalVariableIsCorrected = false;

        if (globalVariableCurrentFocus * itemHeight <= containerScrollTop) {
          $itemsWrapper.current.scrollTop = globalVariableCurrentFocus * itemHeight;
        }
      }
    } else {
      globalVariableIsCorrected = false;
      $itemsWrapper.current.scrollTop = globalVariableCurrentFocus * itemHeight;
    }
  }, []);
  var handleOnItemClick = (0, _react.useCallback)(function (v, e) {
    handleOnChange(v, e);
  }, []);
  var handleOnItemMouseOver = (0, _react.useCallback)(function (index) {
    globalVariableCurrentFocus = index;
    addActive();
  }, []);
  var handleOnItemMouseMove = (0, _react.useCallback)(function () {
    setIsTyping(false);
  }, []);
  var handleOnItemMouseOut = (0, _react.useCallback)(function () {
    removeActive();
  }, []);
  var addActive = (0, _react.useCallback)(function () {
    if (!$itemsRef) return;
    removeActive();
    if (globalVariableCurrentFocus === null) return;
    if (globalVariableCurrentFocus >= $itemsRef.length) globalVariableCurrentFocus = 0;
    if (globalVariableCurrentFocus < 0) globalVariableCurrentFocus = $itemsRef.length - 1;
    /* istanbul ignore next because it won't happen */

    if (!$itemsRef[globalVariableCurrentFocus]) {
      return;
    }

    $itemsRef[globalVariableCurrentFocus].current.className += " ".concat(_reactCustomFlagSelectCss["default"]["".concat(TYPE, "__hover-active")]);
  }, []);
  var removeActive = (0, _react.useCallback)(function () {
    for (var _i2 = 0; _i2 < $itemsRef.length; _i2 += 1) {
      if (!$itemsRef[_i2]) {
        break;
      }

      if ($itemsRef[_i2] && $itemsRef[_i2].current) {
        $itemsRef[_i2].current.className = $itemsRef[_i2].current.className.replace(_reactCustomFlagSelectCss["default"]["".concat(TYPE, "__hover-active")], '');
      }
    }
  }, []);
  /* istanbul ignore next because of https://github.com/airbnb/enzyme/issues/441 && https://github.com/airbnb/enzyme/blob/master/docs/future.md */

  var onKeyDown = (0, _react.useCallback)(function (e) {
    setIsTyping(true);

    if (e.preventDefault) {
      e.preventDefault();
    }

    if (!show) {
      return;
    }

    globalVariableCurrentFocus = globalVariableCurrentFocus === null ? getIndex(optionList, String(value)) : globalVariableCurrentFocus;
    var direction = undefined;
    var keyCode = e.keyCode;
    var keyCodeEsc = 27;
    var keyCodeDown = 40;
    var keyCodeUp = 38;
    var keyCodeEnter = 13;
    var selectKeyList = [keyCodeEsc, keyCodeDown, keyCodeUp, keyCodeEnter];

    if (selectKeyList.indexOf(keyCode) !== -1) {
      if (keyCode === keyCodeEsc) {
        setShow(false);
        resetCurrentFocus();
        return;
      }

      if (keyCode === keyCodeDown) {
        direction = 'down';
        globalVariableCurrentFocus += 1;

        if (globalVariableCurrentFocus > optionList.length - 1) {
          globalVariableCurrentFocus = optionList.length - 1;
        }

        addActive();
      } else if (keyCode === keyCodeUp) {
        direction = 'up';
        globalVariableCurrentFocus -= 1;

        if (globalVariableCurrentFocus < 0) {
          globalVariableCurrentFocus = 0;
        }

        addActive();
      } else if (keyCode === keyCodeEnter) {
        if (globalVariableCurrentFocus > -1) {
          if ($itemsRef[globalVariableCurrentFocus]) {
            $itemsRef[globalVariableCurrentFocus].current.click();
          } else {
            return;
          }
        }
      }
    } else {
      setTimeoutTyping();
      var newkeyCodeList = [].concat(_toConsumableArray(keycodeList), [keyCode]);
      var str = String.fromCharCode.apply(String, _toConsumableArray(newkeyCodeList)).toLowerCase();
      var index = -1;
      optionList.filter(function (i, k) {
        var name = i.name;

        if (name.toLowerCase().startsWith(str)) {
          if (index === -1) {
            index = k;
          }
        }
      });

      if (index !== -1) {
        globalVariableCurrentFocus = index;
        addActive();
      }

      setKeycodeList(newkeyCodeList);
    }

    scroll(direction);
    return globalVariableCurrentFocus;
  }, [show, value, keycodeList]);
  (0, _react.useEffect)(function () {
    if (show && $wrapper) {
      $wrapper.current.addEventListener('keydown', onKeyDown);
    }

    return function () {
      $wrapper.current.removeEventListener('keydown', onKeyDown);
    };
  }, [show, value, keycodeList]);
  var wrapperClass = (0, _utils.cx)(classNameWrapper, _reactCustomFlagSelectCss["default"]["".concat(TYPE, "__wrapper")], disabled && _reactCustomFlagSelectCss["default"]['disabled']);
  var containerClass = (0, _utils.cx)(classNameContainer, _reactCustomFlagSelectCss["default"]["".concat(TYPE, "__container")], show && _reactCustomFlagSelectCss["default"]['show']);
  var inputClass = (0, _utils.cx)(_reactCustomFlagSelectCss["default"]["".concat(TYPE, "__input")]);
  var selectClass = (0, _utils.cx)(classNameSelect, _reactCustomFlagSelectCss["default"]['ellipsis']);
  var selectOptionListContainerClass = (0, _utils.cx)(classNameOptionListContainer, _reactCustomFlagSelectCss["default"]["".concat(TYPE, "__options-container")], show && _reactCustomFlagSelectCss["default"]['show'], animate && _reactCustomFlagSelectCss["default"]["".concat(TYPE, "__options-container-animate")]);
  var selectOptionListItemClass = (0, _utils.cx)(!isTyping && _reactCustomFlagSelectCss["default"]["".concat(TYPE, "__options-item-show-cursor")], classNameOptionListItem, _reactCustomFlagSelectCss["default"]["".concat(TYPE, "__options-item")]);
  var dropdownIconClass = (0, _utils.cx)(classNameDropdownIconOptionListItem, _reactCustomFlagSelectCss["default"]["".concat(TYPE, "__dropdown-icon")]);
  var optionListHtml;
  var item = getItem(optionList, String(value));

  if (optionList.length) {
    if (selectOptionListItemHtml) {
      optionListHtml = selectOptionListItemHtml;
    } else {
      optionListHtml = optionList.map(function (i, k) {
        return _react["default"].createElement(Option, {
          key: k,
          index: k,
          id: "react-custom-flag-select__select_option-".concat(i.id),
          refItem: $itemsRef[k],
          className: String(i.id) === String(value) ? "".concat(selectOptionListItemClass, " ").concat(_reactCustomFlagSelectCss["default"]['active']) : "".concat(selectOptionListItemClass),
          item: i,
          customStyleOptionListItem: customStyleOptionListItem,
          onClick: handleOnItemClick,
          onMouseOver: handleOnItemMouseOver,
          onMouseMove: handleOnItemMouseMove,
          onMouseOut: handleOnItemMouseOut
        });
      });
    }
  }

  var selectorHtml = selectHtml;
  var flagHtml;

  if (item.flag) {
    flagHtml = _react["default"].createElement("div", {
      className: _reactCustomFlagSelectCss["default"]['select__dropdown-flag']
    }, _react["default"].createElement("img", {
      src: item.flag,
      style: {
        width: '100%',
        height: '100%',
        verticalAlign: 'middle'
      }
    }));
  }

  if (!selectorHtml) {
    selectorHtml = _react["default"].createElement("div", {
      className: _reactCustomFlagSelectCss["default"]['select__dropdown']
    }, flagHtml, "\xA0", _react["default"].createElement("div", {
      className: "".concat(_reactCustomFlagSelectCss["default"]['select__dropdown-name'], " ").concat(_reactCustomFlagSelectCss["default"]['ellipsis'])
    }, _react["default"].createElement("div", null, item.id), "\xA0", _react["default"].createElement("div", {
      className: dropdownIconClass
    }, "\xA0")));
  }

  return _react["default"].createElement("div", {
    ref: $wrapper,
    id: _reactCustomFlagSelectCss["default"]["".concat(TYPE, "__wrapper")],
    className: wrapperClass,
    style: customStyleWrapper,
    onClick: function onClick(e) {
      handleOnClick(e);
      !disabled ? setShow(!show) : "";
    },
    onFocus: handleOnFocus,
    onBlur: handleOnBlur
  }, _react["default"].createElement("div", {
    className: containerClass,
    style: customStyleContainer
  }, _react["default"].createElement("input", {
    id: id,
    name: name,
    type: "hidden",
    value: value,
    className: inputClass,
    onChange: function onChange() {}
  }), _react["default"].createElement("div", {
    className: selectClass,
    style: customStyleSelect
  }, _react["default"].createElement("div", {
    className: _reactCustomFlagSelectCss["default"]["".concat(TYPE, "__selector")]
  }, selectorHtml)), _react["default"].createElement("div", {
    ref: $itemsWrapper,
    className: selectOptionListContainerClass,
    style: customStyleOptionListContainer
  }, optionListHtml)));
});
var Option = (0, _react.memo)(function (_ref2) {
  var _ref2$index = _ref2.index,
      index = _ref2$index === void 0 ? -1 : _ref2$index,
      _ref2$refItem = _ref2.refItem,
      refItem = _ref2$refItem === void 0 ? null : _ref2$refItem,
      _ref2$id = _ref2.id,
      id = _ref2$id === void 0 ? '' : _ref2$id,
      _ref2$className = _ref2.className,
      className = _ref2$className === void 0 ? '' : _ref2$className,
      item = _ref2.item,
      _ref2$customStyleOpti = _ref2.customStyleOptionListItem,
      customStyleOptionListItem = _ref2$customStyleOpti === void 0 ? {} : _ref2$customStyleOpti,
      _ref2$onClick = _ref2.onClick,
      onClick = _ref2$onClick === void 0 ? function () {} : _ref2$onClick,
      _ref2$onMouseOver = _ref2.onMouseOver,
      onMouseOver = _ref2$onMouseOver === void 0 ? function () {} : _ref2$onMouseOver,
      _ref2$onMouseMove = _ref2.onMouseMove,
      onMouseMove = _ref2$onMouseMove === void 0 ? function () {} : _ref2$onMouseMove,
      _ref2$onMouseOut = _ref2.onMouseOut,
      onMouseOut = _ref2$onMouseOut === void 0 ? function () {} : _ref2$onMouseOut;
  var handleOnClick = (0, _react.useCallback)(function (e) {
    onClick(item.id, e);
  }, []);
  var handleOnMouseOver = (0, _react.useCallback)(function () {
    onMouseOver(index);
  }, []);
  var handleOnMouseMove = (0, _react.useCallback)(function () {
    onMouseMove();
  }, []);
  var handleOnMouseOut = (0, _react.useCallback)(function () {
    onMouseOut();
  }, []);
  return _react["default"].createElement("div", {
    ref: refItem,
    onMouseOver: handleOnMouseOver,
    onMouseMove: handleOnMouseMove,
    onMouseOut: handleOnMouseOut,
    className: className,
    style: customStyleOptionListItem,
    onClick: handleOnClick
  }, item.flag ? _react["default"].createElement("div", {
    className: _reactCustomFlagSelectCss["default"]["".concat(TYPE, "__dropdown-flag")]
  }, _react["default"].createElement("img", {
    src: item.flag,
    style: {
      width: '100%',
      height: '100%',
      verticalAlign: 'middle'
    }
  })) : '', _react["default"].createElement("div", {
    className: "".concat(_reactCustomFlagSelectCss["default"]['select__dropdown-name'], " ").concat(_reactCustomFlagSelectCss["default"]['ellipsis'])
  }, _react["default"].createElement("div", null, item.displayText ? item.displayText : item.name)));
});
var _default = Index;
exports["default"] = _default;