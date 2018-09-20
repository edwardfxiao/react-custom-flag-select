import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import STYLES from './react-custom-flag-select.css';

const ERROR = 'Please provide valid optionList. i.e optionList=[{id: "1", name: "United States", flag: "us.svg"}, {id: "86", name: "中国", flag: "cn.svg"}]';

export default class ReactCustomFlagSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      show: false
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
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.pageClick = this.pageClick.bind(this);
  }

  componentDidMount() {
    if (document.addEventListener) {
      window.addEventListener('mousedown', this.pageClick, false);
      window.addEventListener('touchstart', this.pageClick, false);
    } else {
      document.attachEvent('onmousedown', this.pageClick);
      document.attachEvent('touchstart', this.pageClick);
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

    const { value, show, successMsg, err } = this.state;

    const wrapperClass = cx(classNameWrapper, STYLES['select__wrapper'], successMsg && !err && STYLES['success'], disabled && STYLES['disabled']);

    const containerClass = cx(classNameContainer, STYLES['select__container'], show && STYLES['show'], successMsg && !err && STYLES['success'], disabled && STYLES['disabled']);

    const inputClass = cx(STYLES['select__input'], successMsg && !err && STYLES['success'], disabled && STYLES['disabled']);

    const selectClass = cx(classNameSelect, STYLES['ellipsis'], STYLES['select__dropdown-menu'], successMsg && !err && STYLES['success'], disabled && STYLES['disabled']);

    const selectOptionListContainerClass = cx(
      classNameOptionListContainer,
      STYLES['select__options-container'],
      show && STYLES['show'],
      successMsg && !err && STYLES['success'],
      disabled && STYLES['disabled']
    );

    const selectOptionListItemClass = cx(classNameOptionListItem, STYLES['select__options-item'], successMsg && !err && STYLES['success'], disabled && STYLES['disabled']);

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
          <div className={selectOptionListContainerClass} style={customStyleOptionListContainer}>
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
