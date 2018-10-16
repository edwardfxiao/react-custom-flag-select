import React from 'react';
import PropTypes from 'prop-types';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactCustomFlagSelect from '../js/ReactCustomFlagSelect/ReactCustomFlagSelect.js';

const SELECTED_INDEX = 2;

const find = (arr, obj) => {
  const res = [];
  arr.filter(o => {
    let match = false;
    Object.keys(obj).map(i => {
      if (obj[i] == o[i]) {
        match = true;
      }
    });
    if (match) {
      res.push(o);
    }
  });
  return res;
};

const OPTION_LIST = [
  { id: '', name: 'Please select one country', displayText: 'Please select one country', flag: 'https://dummyimage.com/600x400/000/fff' },
  { id: 'us', name: 'US', displayText: 'US', flag: 'https://dummyimage.com/600x400/000/fff' },
  { id: 'ca', name: 'CA', displayText: 'CA', flag: 'https://dummyimage.com/600x400/000/fff' }
];

class ReactCustomFlagSelectWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { areaCode: props.value };
  }

  render() {
    const { areaCode } = this.state;
    const currentItem = find(OPTION_LIST, { id: areaCode })[0];
    return (
      <div id="wrapper">
        <ReactCustomFlagSelect
          tabIndex={'1'}
          id={'areaCode'}
          name={'areaCode'}
          value={currentItem.id}
          disabled={false}
          optionList={OPTION_LIST}
          classNameWrapper={''}
          classNameContainer={''}
          classNameOptionListItem={''}
          classNameOptionListContainer={''}
          classNameDropdownIconOptionListItem={''}
          customStyleWrapper={{}}
          customStyleContainer={{ border: 'none', fontSize: '12px' }}
          customStyleSelect={{ width: '60px' }}
          customStyleOptionListItem={{}}
          customStyleOptionListContainer={{ maxHeight: '100px', overflow: 'auto', width: '120px', marginTop: '22%', left: '46px' }}
          customStyleDropdownIcon={{}}
          onChange={areaCode => {
            this.setState({ areaCode: areaCode });
          }}
        />
        <label id="value">{areaCode}</label>
      </div>
    );
  }
}

ReactCustomFlagSelectWrapper.defaultProps = {
  value: ''
};

ReactCustomFlagSelectWrapper.propTypes = {
  value: PropTypes.string
};

configure({ adapter: new Adapter() });
const getWrapper = value => {
  return mount(<ReactCustomFlagSelectWrapper value={value} />);
};

describe('ReactCustomFlagSelect component', () => {
  it('[Normal select]: Should return correct id', () => {
    const value = '';
    const wrapper = getWrapper(value);
    const $input = wrapper.find('#select__wrapper');
    const $labelValue = wrapper.find('#value');
    $input.simulate('click');
    wrapper
      .find('.select__options-item')
      .at(SELECTED_INDEX)
      .simulate('click');
    $input.simulate('blur');
    expect($labelValue.text()).toEqual(OPTION_LIST[SELECTED_INDEX].id);
  });

  it('[ArrowDown]: Should return correct index', () => {
    const value = '';
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} />);
    const instance = wrapper.instance();
    instance.toggleShow(true);
    instance.onKeyDown({ keyCode: 40 });
    expect(instance.onKeyDown({ keyCode: 40 })).toEqual(2);
  });

  it('[ArrowDown]: Should called scroll', () => {
    const value = '';
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} />);
    const instance = wrapper.instance();
    instance.scroll = jest.fn();
    instance.toggleShow(true);
    instance.onKeyDown({ keyCode: 40 });
    expect(instance.scroll).toHaveBeenCalled();
  });

  it('[Type "C" and hit "Enter"]: Should call addActive', () => {
    const value = '';
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} />);
    const instance = wrapper.instance();
    instance.addActive = jest.fn();
    instance.toggleShow(true);
    instance.onKeyDown({ keyCode: 67 });
    instance.onKeyDown({ keyCode: 13 });
    expect(instance.addActive).toHaveBeenCalled();
  });

  it('[Type "C"]: Should call setTimeoutTyping', () => {
    const value = '';
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} />);
    const instance = wrapper.instance();
    instance.setTimeoutTyping = jest.fn();
    instance.toggleShow(true);
    instance.onKeyDown({ keyCode: 67 });
    expect(instance.setTimeoutTyping).toHaveBeenCalled();
  });

  it('[ArrowUp]: Should return correct index', () => {
    const value = '';
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} />);
    wrapper.instance().toggleShow(true);
    expect(wrapper.instance().onKeyDown({ keyCode: 38 })).toEqual(0);
  });

  it('[getIndex]: Should return correct index', () => {
    const value = '';
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} />);
    const instance = wrapper.instance();
    expect(instance.getIndex(OPTION_LIST, 'ca')).toEqual(2);
  });

  it("[onChange]: Should call parent's onChange", () => {
    let value = '';
    const wrapper = mount(
      <ReactCustomFlagSelect
        value={value}
        optionList={OPTION_LIST}
        onChange={res => {
          value = res;
        }}
      />
    );
    const instance = wrapper.instance();
    instance.onChange('us');
    expect(value).toEqual('us');
  });

  it("[onClick]: Should call parent's onClick", () => {
    let value = '';
    const wrapper = mount(
      <ReactCustomFlagSelect
        value={value}
        optionList={OPTION_LIST}
        onClick={() => {
          value = 'clicked';
        }}
      />
    );
    const instance = wrapper.instance();
    instance.onClick();
    expect(value).toEqual('clicked');
  });

  it("[onBlur]: Should call parent's onBlur", () => {
    let value = '';
    const wrapper = mount(
      <ReactCustomFlagSelect
        value={value}
        optionList={OPTION_LIST}
        onBlur={() => {
          value = 'blured';
        }}
      />
    );
    const instance = wrapper.instance();
    instance.onBlur();
    expect(value).toEqual('blured');
  });

  it("[onFocus]: Should call parent's onFocus", () => {
    let value = '';
    const wrapper = mount(
      <ReactCustomFlagSelect
        value={value}
        optionList={OPTION_LIST}
        onFocus={() => {
          value = 'focused';
        }}
      />
    );
    const instance = wrapper.instance();
    instance.onFocus();
    expect(value).toEqual('focused');
  });

  it('[Type "C" and hit "Enter"]: Should call addActive', () => {
    const value = '';
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} />);
    const instance = wrapper.instance();
    instance.addActive = jest.fn();
    instance.toggleShow(true);
    instance.onKeyDown({ keyCode: 67 });
    instance.onKeyDown({ keyCode: 13 });
    expect(instance.addActive).toHaveBeenCalled();
  });

  it('[Type "C"]: Should call setTimeoutTyping', () => {
    const value = '';
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} />);
    const instance = wrapper.instance();
    instance.setTimeoutTyping = jest.fn();
    instance.toggleShow(true);
    instance.onKeyDown({ keyCode: 67 });
    expect(instance.setTimeoutTyping).toHaveBeenCalled();
  });

  it('[Type "C"]: Should call setTimeoutTyping when typingTimeout is undefined', () => {
    const value = '';
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} />);
    const instance = wrapper.instance();
    instance.setTimeoutTyping = jest.fn();
    instance.toggleShow(true);
    wrapper.typingTimeout = undefined;
    instance.onKeyDown({ keyCode: 67 });
    instance.onKeyDown({ keyCode: 68 });
    expect(instance.setTimeoutTyping).toHaveBeenCalled();
  });

  it('[Type "C" and then type "A"]: keycodeList should be [67, 65]', () => {
    const value = '';
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} />);
    const instance = wrapper.instance();
    instance.setTimeoutTyping = jest.fn();
    instance.toggleShow(true);
    wrapper.typingTimeout = undefined;
    instance.onKeyDown({ keyCode: 67 });
    instance.onKeyDown({ keyCode: 65 });
    expect(wrapper.state().keycodeList).toEqual([67, 65]);
  });

  it('[onMouseOver]: Should call addActive', () => {
    const value = '';
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} onChange={() => {}} />);
    wrapper.setState({ isTyping: true });
    const instance = wrapper.instance();
    instance.addActive = jest.fn();
    const $input = wrapper.find('#select__wrapper');
    $input.simulate('click');
    wrapper
      .find('.select__options-item')
      .at(SELECTED_INDEX)
      .simulate('mouseOver');
    expect(instance.addActive).toHaveBeenCalled();
  });

  it('[onMouseOut]: Should call removeActive', () => {
    const value = '';
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} onChange={() => {}} />);
    wrapper.setState({ isTyping: true });
    const instance = wrapper.instance();
    instance.removeActive = jest.fn();
    const $input = wrapper.find('#select__wrapper');
    $input.simulate('click');
    wrapper
      .find('.select__options-item')
      .at(SELECTED_INDEX)
      .simulate('mouseOut');
    expect(instance.removeActive).toHaveBeenCalled();
  });

  it('[onMouseMove]: isTyping should be false', () => {
    const value = '';
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} onChange={() => {}} />);
    wrapper.setState({ isTyping: true });
    const $input = wrapper.find('#select__wrapper');
    $input.simulate('click');
    wrapper
      .find('.select__options-item')
      .at(SELECTED_INDEX)
      .simulate('mouseMove');
    expect(wrapper.state().isTyping).toEqual(false);
  });
  it('[selectOptionListItemHtml]: Should render selectOptionListItemHtml', () => {
    const selectOptionListItemHtml = OPTION_LIST.map((i, k) => {
      return (
        <div className="foo" key={k}>
          {i.name}
        </div>
      );
    });
    const wrapper = mount(<ReactCustomFlagSelect value="" optionList={OPTION_LIST} onChange={() => {}} selectOptionListItemHtml={selectOptionListItemHtml} />);
    const $input = wrapper.find('#select__wrapper');
    $input.simulate('click');
    expect(wrapper.find('.foo').length).toEqual(3);
  });

  it('[pageClick]: Should call onBlur', () => {
    const value = '';
    const validationOption = { check: false };
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} onChange={() => {}} validationOption={validationOption} />);
    const instance = wrapper.instance();
    instance.onFocus();
    instance.onBlur = jest.fn();
    instance.pageClick({ target: null });
    expect(instance.onBlur).toHaveBeenCalled();
  });

  it('[STYLES]: Should have STYLES', () => {
    ReactCustomFlagSelect.__Rewire__('STYLES', {
      select__input: 'select__input_hash'
    });
    const value = '';
    const validationOption = { check: false };
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} onChange={() => {}} validationOption={validationOption} />);
    expect(wrapper.find('.select__input_hash').length).toEqual(1);
  });
});

describe('ReactCustomFlagSelect component componentWillReceiveProps', () => {
  it('[value]: err should be false if this.props.value != nextProps.value', () => {
    const value = 'us';
    const wrapper = mount(<ReactCustomFlagSelect optionList={OPTION_LIST} value="" />);
    wrapper.setProps({ value });
    expect(wrapper.state().value).toEqual(value);
    expect(wrapper.state().err).toEqual(false);
    expect(wrapper.state().successMsg).toEqual(undefined);
  });
});
