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
    wrapper.instance().toggleShow(true);
    wrapper.instance().onKeyDown({ keyCode: 40 });
    expect(wrapper.instance().onKeyDown({ keyCode: 40 })).toEqual(2);
  });

  it('[ArrowUp]: Should return correct index', () => {
    const value = '';
    const wrapper = mount(<ReactCustomFlagSelect value={value} optionList={OPTION_LIST} />);
    wrapper.instance().toggleShow(true);
    expect(wrapper.instance().onKeyDown({ keyCode: 38 })).toEqual(0);
  });
});
