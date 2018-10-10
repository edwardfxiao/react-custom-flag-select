import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
let STYLES = {};
try {
  STYLES = require('./react-custom-flag-select.css');
} catch (ex) {}

const ERROR = 'Please provide valid optionList. i.e optionList=[{id: "1", name: "United States", flag: "us.svg"}, {id: "86", name: "中国", flag: "cn.svg"}]';

class ReactCustomFlagSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      show: false,
      isTyping: false,
      keycodeList: []
    };
    if (!props.optionList.length) {
      console.error(ERROR);
      return;
    } else {
      props.optionList.map(i => {
        if (typeof i.name == 'undefined' || typeof i.id == 'undefined') {
          console.error(ERROR);
        }
        return;
      });
    }
    this.optionItems = [];
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.pageClick = this.pageClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount() {
    if (document.addEventListener) {
      window.addEventListener('mousedown', this.pageClick, false);
      window.addEventListener('touchstart', this.pageClick, false);
    } else {
      document.attachEvent('onmousedown', this.pageClick);
      document.attachEvent('touchstart', this.pageClick);
    }
    this.wrapper.addEventListener('keydown', this.onKeyPress);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.show != this.state.show) {
      if (this.state.show) {
        this.resetCurrentFocus();
      }
    }
  }

  componentWillUnmount() {
    if (document.removeEventListener) {
      window.removeEventListener('mousedown', this.pageClick, false);
      window.removeEventListener('touchstart', this.pageClick, false);
    } else {
      document.detachEvent('onmousedown', this.pageClick);
      document.detachEvent('touchstart', this.pageClick);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (String(this.props.value) != String(nextProps.value)) {
      this.setState({
        value: nextProps.value,
        err: false,
        successMsg: undefined
      });
    }
  }

  onChange(value, e) {
    const { onChange } = this.props;
    onChange && onChange(value, e);
    this.setState({ value });
  }

  onClick(e) {
    const { onClick } = this.props;
    onClick && onClick(e);
  }

  onBlur(e) {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(e);
    }
  }

  onFocus(e) {
    this.focus = true;
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(e);
    }
  }

  getIndex(list, val) {
    let key = -1;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == val) {
        key = i;
        break;
      }
    }
    return key;
  }

  resetCurrentFocus() {
    const { value } = this.state;
    const { optionList } = this.props;
    this.currentFocus = this.getIndex(optionList, value);
    this.scroll();
  }

  onKeyPress(e) {
    this.setState({ isTyping: true });
    e.preventDefault();
    const { show, value } = this.state;
    if (!show) {
      return;
    }
    const x = this.optionItems;
    const { optionList } = this.props;
    this.currentFocus = typeof this.currentFocus != 'undefined' ? this.currentFocus : this.getIndex(optionList, value);
    let direction = null;
    const { keyCode } = e;
    const keyCodeEsc = 27;
    const keyCodeDown = 40;
    const keyCodeUp = 38;
    const keyCodeEnter = 13;
    const selectKeyList = [keyCodeEsc, keyCodeDown, keyCodeUp, keyCodeEnter];
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
      const { keycodeList } = this.state;
      if (!(keyCode >= 48 || keyCode <= 57 || keyCode >= 65 || keyCode <= 90 || keyCode >= 96 || keyCode <= 105)) {
        return;
      }
      this.setTimeoutTyping();
      const newkeyCodeList = [...keycodeList, keyCode];
      const str = String.fromCharCode(...newkeyCodeList).toLowerCase();
      let index = -1;
      optionList.filter((i, k) => {
        const { name, displayText } = i;
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

  setTimeoutTyping() {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.typingTimeout = setTimeout(() => {
      this.setState({ keycodeList: [] });
    }, 250);
  }

  scroll(direction) {
    const containerHeight = this.itemsWrapper.offsetHeight;
    const containerScrollTop = this.itemsWrapper.scrollTop;
    const itemHeight = this.optionItems[this.currentFocus].offsetHeight;
    if (direction) {
      if (direction == 'down') {
        const bound = containerScrollTop + containerHeight;
        const heightItems = this.currentFocus * itemHeight;
        const heightContainer = bound - itemHeight;
        if (heightItems >= heightContainer) {
          const offset = Math.abs(heightItems - heightContainer - itemHeight);
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

  addActive() {
    const x = this.optionItems;
    if (!x) return false;
    this.removeActive();
    if (this.currentFocus >= x.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = x.length - 1;
    const item = x[this.currentFocus];
    item.classList.add(STYLES['select__hover-active']);
  }

  removeActive() {
    const x = this.optionItems;
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove(STYLES['select__hover-active']);
    }
  }

  pageClick(e) {
    if (this.wrapper.contains(e.target)) {
      return;
    }
    if (this.focus) {
      this.onBlur();
      this.focus = false;
    }
    this.toggleShow(false);
  }

  toggleShow(show) {
    this.setState({ show });
  }

  render() {
    const {
      tabIndex,
      id,
      name,
      optionList,
      disabled,
      classNameWrapper,
      classNameContainer,
      classNameSelect,
      classNameOptionListContainer,
      classNameOptionListItem,
      classNameDropdownIconOptionListItem,
      customStyleWrapper,
      customStyleContainer,
      customStyleSelect,
      customStyleOptionListContainer,
      customStyleOptionListItem,
      selectHtml,
      selectOptionListItemHtml
    } = this.props;

    const { value, show, isTyping } = this.state;

    const wrapperClass = cx(classNameWrapper, STYLES['select__wrapper'], disabled && STYLES['disabled']);

    const containerClass = cx(classNameContainer, STYLES['select__container'], show && STYLES['show'], disabled && STYLES['disabled']);

    const inputClass = cx(STYLES['select__input'], disabled && STYLES['disabled']);

    const selectClass = cx(classNameSelect, STYLES['ellipsis'], STYLES['select__dropdown-menu'], disabled && STYLES['disabled']);

    const selectOptionListContainerClass = cx(classNameOptionListContainer, STYLES['select__options-container'], show && STYLES['show'], disabled && STYLES['disabled']);

    const selectOptionListItemClass = cx(!isTyping && STYLES['select__options-item-show-cursor'], classNameOptionListItem, STYLES['select__options-item'], disabled && STYLES['disabled']);

    const dropdownIconClass = cx(classNameDropdownIconOptionListItem, STYLES['select__dropdown-icon']);

    let optionListHtml;
    let item;
    optionList.filter(i => {
      if (String(i.id) == String(value)) {
        item = i;
      }
    });
    if (optionList.length) {
      if (selectOptionListItemHtml) {
        optionListHtml = selectOptionListItemHtml;
      } else {
        optionListHtml = optionList.map((i, k) => {
          return (
            <div
              ref={ref => (this.optionItems[k] = ref)}
              onMouseOver={() => {
                this.currentFocus = k;
                this.addActive();
              }}
              onMouseMove={() => {
                this.setState({ isTyping: false });
              }}
              onMouseOut={() => {
                this.removeActive();
              }}
              className={String(i.id) == String(value) ? `${selectOptionListItemClass} ${STYLES['active']}` : `${selectOptionListItemClass}`}
              key={k}
              style={customStyleOptionListItem}
              onClick={e => {
                this.onChange(i.id, e);
              }}
            >
              {i.flag ? (
                <div style={{ width: '30%' }}>
                  <img src={i.flag} style={{ width: '100%', height: '100%', verticalAlign: 'middle' }} />
                </div>
              ) : (
                ''
              )}
              <div>{i.displayText ? i.displayText : i.name}</div>
            </div>
          );
        });
      }
    }
    let selectorHtml = selectHtml;
    let flagHtml;
    if (item.flag) {
      flagHtml = (
        <div style={{ width: '30%' }}>
          <img src={item.flag} style={{ width: '100%', height: '100%', verticalAlign: 'middle' }} />
        </div>
      );
    }
    if (!selectorHtml) {
      selectorHtml = (
        <div className={STYLES['select__dropdown']}>
          {flagHtml}&nbsp;
          <div className={STYLES['ellipsis']}>{item.id}&nbsp;</div>
          <div className={dropdownIconClass} />
        </div>
      );
    }
    return (
      <div
        tabIndex={tabIndex}
        id={STYLES['select__wrapper']}
        className={wrapperClass}
        style={customStyleWrapper}
        onClick={e => {
          this.onClick(e);
          !disabled ? this.toggleShow(!show) : ``;
        }}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        ref={ref => (this.wrapper = ref)}
      >
        <div className={containerClass} style={customStyleContainer}>
          <input id={id} name={name} type="hidden" value={value} className={inputClass} onChange={() => {}} ref={ref => (this.input = ref)} />
          <div className={selectClass} style={customStyleSelect}>
            {selectorHtml}
          </div>
          <div ref={ref => (this.itemsWrapper = ref)} className={selectOptionListContainerClass} style={customStyleOptionListContainer}>
            {optionListHtml}
          </div>
        </div>
      </div>
    );
  }
}

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
  onChange: () => {}
};

ReactCustomFlagSelect.propTypes = {
  tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  validate: PropTypes.bool,
  optionList: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  validationOption: PropTypes.object,
  locale: PropTypes.string,
  selectHtml: PropTypes.element,
  selectOptionListItemHtml: PropTypes.array,
  classNameWrapper: PropTypes.string,
  classNameContainer: PropTypes.string,
  classNameSelect: PropTypes.string,
  classNameOptionListContainer: PropTypes.string,
  classNameDropdownIconOptionListItem: PropTypes.string,
  classNameOptionListItem: PropTypes.string,
  customStyleWrapper: PropTypes.object,
  customStyleContainer: PropTypes.object,
  customStyleSelect: PropTypes.object,
  customStyleOptionListContainer: PropTypes.object,
  customStyleDropdownIcon: PropTypes.object,
  customStyleOptionListItem: PropTypes.object
};

export default ReactCustomFlagSelect;
