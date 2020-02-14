import React, { useEffect, useState, useCallback, useRef, useMemo, memo } from 'react';
import { cx, getRandomId } from './utils.js';
// DEVELOPMENT
// import './react-custom-flag-select.css';
// import STYLES from './react-custom-flag-select.css.json';
// BUILD PRODUCTION
import STYLES from './react-custom-flag-select.css';
const TYPE = 'select';
const keyCodeEsc = 27;
const keyCodeDown = 40;
const keyCodeUp = 38;
const keyCodeEnter = 13;
const selectKeyList = [keyCodeEsc, keyCodeDown, keyCodeUp, keyCodeEnter];
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
    showSearch = false,
    keyword = '',
    showArrow = true,
    animate = false,
    optionList = [],
    classNameWrapper = '',
    classNameContainer = '',
    classNameSelect = '',
    classNameButton = '',
    classNameOptionListItem = '',
    classNameOptionListContainer = '',
    classNameDropdownIconOptionListItem = '',
    customStyleWrapper = {},
    customStyleContainer = {},
    customStyleSelect = {},
    customStyleButton = {},
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
    const stateKeyword = useState(keyword);
    const [isTyping, setIsTyping] = useState(false);
    const $wrapper = useRef(null);
    const $itemsWrapper = useRef(null);
    const $searchInputWrapper = useRef(null);
    const $searchInput = useRef(null);
    const $itemsRef = [];
    if (optionList.length) {
      for (let i = 0; i < optionList.length; i += 1) {
        $itemsRef.push(useRef(null));
      }
    }
    const filteredOptionList = useMemo(() => {
      let res = optionList;
      if (res.length) {
        if (stateKeyword[0]) {
          res = optionList.filter(i => i.name.toLowerCase().includes(stateKeyword[0].toLowerCase()));
        }
      }
      return res;
    }, [stateKeyword[0], optionList]);
    const handleOnSearch = useCallback(e => {
      stateKeyword[1](e.target.value);
    }, []);
    const handleOnSearchKeyDown = useCallback(
      e => {
        const { keyCode } = e;
        const direction = getDirection(keyCode);
        if (selectKeyList.indexOf(keyCode) !== -1) {
          e.preventDefault();
          handleOnKeyDown(keyCode);
        } else if (keyCode === 32) {
          // space
          stateKeyword[1](`${stateKeyword[0]} `);
          e.preventDefault();
        }
        scroll(direction);
      },
      [filteredOptionList],
    );
    useEffect(() => {
      if (show && showSearch) {
        globalVariableCurrentFocus = 0;
        scroll('up');
        addActive();
      }
    }, [stateKeyword[0]]);
    useEffect(() => {
      if (show) {
        if (showSearch) {
          $searchInput.current.focus();
        }
      }
      resetCurrentFocus();
    }, [show]);
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
    const handleOnChange = useCallback(
      (val, e) => {
        if (disabled || $wrapper === null) {
          return;
        }
        setShow(!show);
        setInternalValue(val);
        onChange && onChange(val, e);
      },
      [show],
    );
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
    const resetCurrentFocus = useCallback(() => {
      globalVariableCurrentFocus = getIndex(optionList, internalValue);
      scroll();
    }, [internalValue]);
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
      if ($itemsWrapper && $itemsWrapper.current && $itemsWrapper.current.children) {
        const $children = $itemsWrapper.current.children;
        const containerHeight = $itemsWrapper.current.offsetHeight;
        const containerScrollTop = $itemsWrapper.current.scrollTop;
        if (!$children[globalVariableCurrentFocus]) {
          return;
        }
        const itemHeight = $children[globalVariableCurrentFocus].offsetHeight;
        if (direction) {
          if (direction === 'loop') {
            $itemsWrapper.current.scrollTop = $children.length * itemHeight;
            return;
          }
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
      }
    }, []);
    const handleOnItemClick = useCallback(
      (v, e) => {
        handleOnChange(v, e);
        stateKeyword[1]('');
      },
      [show],
    );
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
      if (!$itemsRef[globalVariableCurrentFocus].current) {
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
    const getDirection = useCallback(keyCode => {
      switch (keyCode) {
        case keyCodeUp:
          return 'up';
        case keyCodeDown:
          return 'down';
        default:
          return undefined;
      }
    }, []);
    const handleOnKeyDown = useCallback(
      keyCode => {
        if (keyCode === keyCodeEsc) {
          setShow(false);
          resetCurrentFocus();
          return;
        }
        if (keyCode === keyCodeDown) {
          globalVariableCurrentFocus += 1;
          if (globalVariableCurrentFocus > filteredOptionList.length - 1) {
            globalVariableCurrentFocus = 0;
            scroll('up');
          }
          addActive();
        } else if (keyCode === keyCodeUp) {
          globalVariableCurrentFocus -= 1;
          if (globalVariableCurrentFocus < 0) {
            globalVariableCurrentFocus = filteredOptionList.length - 1;
            scroll('loop');
          }
          addActive();
        } else if (keyCode === keyCodeEnter) {
          if (globalVariableCurrentFocus > -1) {
            if ($itemsWrapper && $itemsWrapper.current && $itemsWrapper.current.children) {
              const $children = $itemsWrapper.current.children;
              if ($children[globalVariableCurrentFocus]) {
                $children[globalVariableCurrentFocus].click();
              } else {
                return;
              }
            }
          }
        }
      },
      [filteredOptionList],
    );
    /* istanbul ignore next because of https://github.com/airbnb/enzyme/issues/441 && https://github.com/airbnb/enzyme/blob/master/docs/future.md */
    const onKeyDown = useCallback(
      e => {
        if (showSearch) {
          return;
        }
        setIsTyping(true);
        if (e.preventDefault) {
          e.preventDefault();
        }
        if (!show) {
          return;
        }
        globalVariableCurrentFocus = globalVariableCurrentFocus === null ? getIndex(filteredOptionList, String(value)) : globalVariableCurrentFocus;
        const { keyCode } = e;
        const direction = getDirection(keyCode);
        if (selectKeyList.indexOf(keyCode) !== -1) {
          handleOnKeyDown(keyCode);
        } else {
          setTimeoutTyping();
          const newkeyCodeList = [...keycodeList, keyCode];
          const str = String.fromCharCode(...newkeyCodeList).toLowerCase();
          let index = -1;
          filteredOptionList.forEach((i, k) => {
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
    useEffect(() => {
      if (show && $wrapper) {
        $wrapper.current.addEventListener('keydown', onKeyDown);
      }
      return () => {
        $wrapper.current.removeEventListener('keydown', onKeyDown);
      };
    }, [show, value, keycodeList]);
    useEffect(() => {
      setInternalValue(String(value));
    }, [value]);
    const wrapperClass = cx(classNameWrapper, STYLES[`${TYPE}__wrapper`], disabled && STYLES['disabled']);
    const containerClass = cx(classNameContainer, STYLES[`${TYPE}__container`], show && STYLES['show']);
    const inputClass = cx(STYLES[`${TYPE}__input`]);
    const selectClass = cx(classNameSelect, STYLES[`${TYPE}__buttonWrapper`], STYLES['ellipsis']);
    const selectOptionListContainerClass = cx(classNameOptionListContainer, STYLES[`${TYPE}__options-container`], show && STYLES['show'], animate && STYLES[`${TYPE}__options-container-animate`]);
    const selectOptionListItemClass = cx(!isTyping && STYLES[`${TYPE}__options-item-show-cursor`], classNameOptionListItem, STYLES[`${TYPE}__options-item`]);
    const dropdownIconClass = cx(classNameDropdownIconOptionListItem, STYLES[`${TYPE}__dropdown-icon`], showArrow && STYLES['showArrow']);
    let optionListHtml;
    const item = getItem(optionList, String(value));
    if (filteredOptionList.length) {
      if (selectOptionListItemHtml) {
        optionListHtml = selectOptionListItemHtml;
      } else {
        optionListHtml = filteredOptionList.map((i, k) => (
          <Option
            key={k}
            index={k}
            id={`react-custom-flag-select__select_option-${i.id}`}
            refItem={$itemsRef[k]}
            className={String(i.id) === String(value) ? `${selectOptionListItemClass} ${STYLES['active']}` : `${selectOptionListItemClass}`}
            item={i}
            customStyleOptionListItem={customStyleOptionListItem}
            onClick={handleOnItemClick}
            show={show}
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
      <div ref={$wrapper} id={STYLES[`${TYPE}__wrapper`]} className={wrapperClass} style={customStyleWrapper}>
        <div className={containerClass} style={customStyleContainer}>
          <input id={id} name={name} type="hidden" value={value} className={inputClass} onChange={() => {}} />
          <div className={selectClass} style={customStyleSelect}>
            <button
              type="button"
              className={cx(STYLES[`${TYPE}__button`], classNameButton)}
              style={{ ...customStyleButton }}
              onClick={e => {
                handleOnClick(e);
                if (!disabled) {
                  if ($searchInputWrapper.current) {
                    if ($searchInputWrapper.current.contains(e.target)) {
                      setShow(true);
                      return;
                    }
                  }
                  setShow(!show);
                }
              }}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
            >
              <div className={STYLES[`${TYPE}__selector`]}>{selectorHtml}</div>
            </button>
          </div>
          <div className={selectOptionListContainerClass}>
            {showSearch && (
              <div ref={$searchInputWrapper} style={{ ...customStyleOptionListContainer, overflow: 'hidden' }}>
                <div className={STYLES[`${TYPE}__searchInputWrapper`]}>
                  <svg className={STYLES[`${TYPE}__searchInputSearchIcon`]} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill="#cdcdcd"
                      d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                    />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                  <input className={STYLES[`${TYPE}__searchInput`]} ref={$searchInput} value={stateKeyword[0]} onChange={handleOnSearch} onKeyDown={handleOnSearchKeyDown} />
                  {stateKeyword[0] && (
                    <svg
                      className={STYLES[`${TYPE}__searchInputRemoveIcon`]}
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      onClick={() => {
                        stateKeyword[1]('');
                        $searchInput.current.focus();
                      }}
                    >
                      <path
                        fill="#cdcdcd"
                        d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                      />
                      <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                  )}
                </div>
              </div>
            )}
            <div ref={$itemsWrapper} style={customStyleOptionListContainer}>
              {optionListHtml}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

const Option = memo(
  ({ index = -1, refItem = null, id = '', className = '', item, customStyleOptionListItem = {}, onClick = () => {}, onMouseOver = () => {}, onMouseMove = () => {}, onMouseOut = () => {}, show }) => {
    const handleOnClick = useCallback(
      e => {
        onClick(item.id, e);
      },
      [show, item],
    );
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
