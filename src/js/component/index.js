import React, { useEffect, useState, useCallback, useRef, memo } from 'react';
import { cx, getRandomId } from './utils.js';
// DEVELOPMENT
import './react-custom-flag-select.css';
import STYLES from './react-custom-flag-select.css.json';
// BUILD PRODUCTION
// import STYLES from './react-custom-flag-select.css';
const TYPE = 'select';
let globalVariableIsFocusing = false;
let globalVariableIsCorrected = false;
let globalVariableCurrentFocus = null;
let globalVariableTypingTimeout = null;
export const getItem = (list, value) => {
  let res = null;
  if (list.length) {
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].id === value) {
        res = list[i];
        break;
      }
    }
  }
  return res;
};
export const getIndex = (list, value) => {
  let key = -1;
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].id === value) {
      key = i;
      break;
    }
  }
  return key;
};
const DEFAULT_ID = getRandomId();
const Index = memo(
  ({
    tabIndex = null,
    id = DEFAULT_ID,
    name = '',
    value = '',
    disabled = false,
    optionList = [],
    classNameWrapper = '',
    classNameContainer = '',
    classNameSelect = '',
    classNameOptionListItem = '',
    classNameOptionListContainer = '',
    classNameDropdownIconOptionListItem = '',
    customStyleWrapper = {},
    customStyleContainer = {},
    customStyleSelect = {},
    customStyleOptionListItem = {},
    customStyleOptionListContainer = {},
    selectHtml = null,
    selectOptionListItemHtml = null,
    onChange = () => {},
    onBlur = null,
    onFocus = null,
    onClick = null,
  }) => {
    const [show, setShow] = useState(false);
    const [internalValue, setInternalValue] = useState(String(value));
    const [keycodeList, setKeycodeList] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const $wrapper = useRef(null);
    const $itemsWrapper = useRef(null);
    const $itemsRef = [];
    if (optionList.length) {
      for (let i = 0; i < optionList.length; i += 1) {
        $itemsRef.push(useRef(null));
      }
    }
    const handleOnBlur = useCallback(
      e => {
        if (onBlur) {
          onBlur(e);
        }
      },
      [internalValue],
    );
    const handleOnFocus = useCallback(e => {
      if (onFocus) {
        onFocus(e);
      }
    }, []);
    const handleOnClick = useCallback(e => {
      if (onClick) {
        onClick(e);
      }
    }, []);
    const handleOnChange = useCallback((val, e) => {
      if (disabled || $wrapper === null) {
        return;
      }
      setInternalValue(val);
      onChange && onChange(val, e);
    }, []);
    /* istanbul ignore next because of https://github.com/airbnb/enzyme/issues/441 && https://github.com/airbnb/enzyme/blob/master/docs/future.md */
    useEffect(() => {
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
      return () => {
        window.removeEventListener('mousedown', pageClick);
        window.removeEventListener('touchstart', pageClick);
        $wrapper.current.removeEventListener('keydown', onKeyDown);
      };
    }, []);
    /* istanbul ignore next because of https://github.com/airbnb/enzyme/issues/441 && https://github.com/airbnb/enzyme/blob/master/docs/future.md */
    const pageClick = useCallback(e => {
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
    const resetCurrentFocus = useCallback(
      () => {
        globalVariableCurrentFocus = getIndex(optionList, internalValue);
        scroll();
      },
      [internalValue],
    );
    /* istanbul ignore next because of https://github.com/airbnb/enzyme/issues/441 && https://github.com/airbnb/enzyme/blob/master/docs/future.md */
    const setTimeoutTyping = useCallback(() => {
      if (globalVariableTypingTimeout) {
        clearTimeout(globalVariableTypingTimeout);
      }
      globalVariableTypingTimeout = setTimeout(() => {
        setKeycodeList([]);
      }, 250);
    }, []);
    /* istanbul ignore next because of https://github.com/airbnb/enzyme/issues/441 && https://github.com/airbnb/enzyme/blob/master/docs/future.md */
    const scroll = useCallback((direction = undefined) => {
      if ($itemsWrapper === null) {
        return;
      }
      const containerHeight = $itemsWrapper.current.offsetHeight;
      const containerScrollTop = $itemsWrapper.current.scrollTop;
      if (!globalVariableCurrentFocus || !$itemsRef[globalVariableCurrentFocus]) {
        return;
      }
      if ($itemsRef[globalVariableCurrentFocus] === null) {
        return;
      }
      const itemHeight = $itemsRef[globalVariableCurrentFocus].current.offsetHeight;
      if (direction) {
        if (direction === 'down') {
          const bound = containerScrollTop + containerHeight;
          const heightItems = globalVariableCurrentFocus * itemHeight;
          const heightContainer = bound - itemHeight;
          if (heightItems >= heightContainer) {
            const offset = Math.abs(heightItems - heightContainer - itemHeight);
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
    const handleOnItemClick = useCallback((v, e) => {
      handleOnChange(v, e);
    }, []);
    const handleOnItemMouseOver = useCallback(index => {
      globalVariableCurrentFocus = index;
      addActive();
    }, []);
    const handleOnItemMouseMove = useCallback(() => {
      setIsTyping(false);
    }, []);
    const handleOnItemMouseOut = useCallback(() => {
      removeActive();
    }, []);
    const addActive = useCallback(() => {
      if (!$itemsRef) return;
      removeActive();
      if (globalVariableCurrentFocus === null) return;
      if (globalVariableCurrentFocus >= $itemsRef.length) globalVariableCurrentFocus = 0;
      if (globalVariableCurrentFocus < 0) globalVariableCurrentFocus = $itemsRef.length - 1;
      /* istanbul ignore next because it won't happen */
      if (!$itemsRef[globalVariableCurrentFocus]) {
        return;
      }
      $itemsRef[globalVariableCurrentFocus].current.className += ` ${STYLES[`${TYPE}__hover-active`]}`;
    }, []);
    const removeActive = useCallback(() => {
      for (let i = 0; i < $itemsRef.length; i += 1) {
        if (!$itemsRef[i]) {
          break;
        }
        if ($itemsRef[i] && $itemsRef[i].current) {
          $itemsRef[i].current.className = $itemsRef[i].current.className.replace(STYLES[`${TYPE}__hover-active`], '');
        }
      }
    }, []);

    /* istanbul ignore next because of https://github.com/airbnb/enzyme/issues/441 && https://github.com/airbnb/enzyme/blob/master/docs/future.md */
    const onKeyDown = useCallback(
      e => {
        setIsTyping(true);
        if (e.preventDefault) {
          e.preventDefault();
        }
        if (!show) {
          return;
        }
        globalVariableCurrentFocus = globalVariableCurrentFocus === null ? getIndex(optionList, String(value)) : globalVariableCurrentFocus;
        let direction = undefined;
        const { keyCode } = e;
        const keyCodeEsc = 27;
        const keyCodeDown = 40;
        const keyCodeUp = 38;
        const keyCodeEnter = 13;
        const selectKeyList = [keyCodeEsc, keyCodeDown, keyCodeUp, keyCodeEnter];
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
          const newkeyCodeList = [...keycodeList, keyCode];
          const str = String.fromCharCode(...newkeyCodeList).toLowerCase();
          let index = -1;
          optionList.filter((i, k) => {
            const { name } = i;
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
      },
      [show, value, keycodeList],
    );
    useEffect(
      () => {
        if (show && $wrapper) {
          $wrapper.current.addEventListener('keydown', onKeyDown);
        }
        return () => {
          $wrapper.current.removeEventListener('keydown', onKeyDown);
        };
      },
      [show, value, keycodeList],
    );
    const wrapperClass = cx(classNameWrapper, STYLES[`${TYPE}__wrapper`], disabled && STYLES['disabled']);
    const containerClass = cx(classNameContainer, STYLES[`${TYPE}__container`], show && STYLES['show']);
    const inputClass = cx(STYLES[`${TYPE}__input`]);
    const selectClass = cx(classNameSelect, STYLES['ellipsis']);
    const selectOptionListContainerClass = cx(classNameOptionListContainer, STYLES[`${TYPE}__options-container`], show && STYLES['show']);
    const selectOptionListItemClass = cx(!isTyping && STYLES[`${TYPE}__options-item-show-cursor`], classNameOptionListItem, STYLES[`${TYPE}__options-item`]);
    const dropdownIconClass = cx(classNameDropdownIconOptionListItem, STYLES[`${TYPE}__dropdown-icon`]);
    let optionListHtml;
    const item = getItem(optionList, String(value));
    if (optionList.length) {
      if (selectOptionListItemHtml) {
        optionListHtml = selectOptionListItemHtml;
      } else {
        optionListHtml = optionList.map((i, k) => (
          <Option
            key={k}
            index={k}
            id={`react-custom-flag-select__select_option-${i.id}`}
            refItem={$itemsRef[k]}
            className={String(i.id) === String(value) ? `${selectOptionListItemClass} ${STYLES['active']}` : `${selectOptionListItemClass}`}
            item={i}
            customStyleOptionListItem={customStyleOptionListItem}
            onClick={handleOnItemClick}
            onMouseOver={handleOnItemMouseOver}
            onMouseMove={handleOnItemMouseMove}
            onMouseOut={handleOnItemMouseOut}
          />
        ));
      }
    }
    let selectorHtml = selectHtml;
    let flagHtml;
    if (item.flag) {
      flagHtml = (
        <div className={STYLES['select__dropdown-flag']}>
          <img src={item.flag} style={{ width: '100%', height: '100%', verticalAlign: 'middle' }} />
        </div>
      );
    }
    if (!selectorHtml) {
      selectorHtml = (
        <div className={STYLES['select__dropdown']}>
          {flagHtml}&nbsp;
          <div className={`${STYLES['select__dropdown-name']} ${STYLES['ellipsis']}`}>
            <div>{item.id}</div>&nbsp;<div className={dropdownIconClass}>&nbsp;</div>
          </div>
        </div>
      );
    }
    return (
      <div
        ref={$wrapper}
        id={STYLES[`${TYPE}__wrapper`]}
        className={wrapperClass}
        style={customStyleWrapper}
        onClick={e => {
          handleOnClick(e);
          !disabled ? setShow(!show) : ``;
        }}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      >
        <div className={containerClass} style={customStyleContainer}>
          <input id={id} name={name} type="hidden" value={value} className={inputClass} onChange={() => {}} />
          <div className={selectClass} style={customStyleSelect}>
            <div className={STYLES[`${TYPE}__selector`]}>{selectorHtml}</div>
          </div>
          <div ref={$itemsWrapper} className={selectOptionListContainerClass} style={customStyleOptionListContainer}>
            {optionListHtml}
          </div>
        </div>
      </div>
    );
  },
);

const Option = memo(
  ({ index = -1, refItem = null, id = '', className = '', item, customStyleOptionListItem = {}, onClick = () => {}, onMouseOver = () => {}, onMouseMove = () => {}, onMouseOut = () => {} }) => {
    const handleOnClick = useCallback(e => {
      onClick(item.id, e);
    }, []);
    const handleOnMouseOver = useCallback(() => {
      onMouseOver(index);
    }, []);
    const handleOnMouseMove = useCallback(() => {
      onMouseMove();
    }, []);
    const handleOnMouseOut = useCallback(() => {
      onMouseOut();
    }, []);
    return (
      <div ref={refItem} onMouseOver={handleOnMouseOver} onMouseMove={handleOnMouseMove} onMouseOut={handleOnMouseOut} className={className} style={customStyleOptionListItem} onClick={handleOnClick}>
        {item.flag ? (
          <div className={STYLES[`${TYPE}__dropdown-flag`]}>
            <img src={item.flag} style={{ width: '100%', height: '100%', verticalAlign: 'middle' }} />
          </div>
        ) : (
          ''
        )}
        <div className={`${STYLES['select__dropdown-name']} ${STYLES['ellipsis']}`}>
          <div>{item.displayText ? item.displayText : item.name}</div>
        </div>
      </div>
    );
  },
);

export default Index;
