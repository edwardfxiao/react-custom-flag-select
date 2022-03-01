import 'raf/polyfill';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Textbox } from 'react-inputs-validation';
import validator from 'validator';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import ReactCustomFlagSelect from '../src/js/component/index.ts';

import STYLES from '../src/css/example.css';

const FLAG_SELECTOR_OPTION_LIST = [
  { id: '1', name: 'US', displayText: 'US(1)', englishName: 'United States', locale: 'en-US', flag: require('../src/image/flags/us.svg') },
  { id: '86', name: '中国', displayText: '中国(86)', englishName: 'China', locale: 'zh-CN', flag: require('../src/image/flags/cn.svg') },
];

const DEFAULT_AREA_CODE = FLAG_SELECTOR_OPTION_LIST[0].id;

const find = (arr, obj) => {
  const res = [];
  arr.forEach(o => {
    let match = false;
    Object.keys(obj).forEach(i => {
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

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { areaCode: DEFAULT_AREA_CODE, phone: '', hasPhoneError: true, validate: false };
    this.submit = this.submit.bind(this);
  }

  handlePhoneChange(res) {
    this.setState({ phone: res });
  }

  toggleValidating(validate) {
    this.setState({ validate });
  }

  submit(e) {
    e.preventDefault();
    this.toggleValidating(true);
    const { hasPhoneError } = this.state;
    if (!hasPhoneError) {
      alert('You are good to go');
    }
  }

  render() {
    const { areaCode, phone, validate } = this.state;
    const currentItem = find(FLAG_SELECTOR_OPTION_LIST, { id: areaCode })[0];
    return (
      <div style={{ padding: '10px' }}>
        <div style={{ padding: '20px', border: '1px solid #e5e5e5' }}>
          <form onSubmit={this.submit}>
            <div style={{ position: 'relative', marginBottom: '30px' }}>
              <div style={{ position: 'absolute', height: '45px' }}>
                <ReactCustomFlagSelect
                  attributesWrapper={{ id: 'areaCodeWrapper', tabIndex: '1' }} //Optional.[Object].Modify wrapper general attributes.
                  attributesButton={{ id: 'areaCodeButton' }} //Optional.[Object].Modify button general attributes.
                  attributesInput={{ id: 'areaCode', name: 'areaCode' }} //Optional.[Object].Modify hidden input general attributes.
                  name={'areaCode'} //Optional.[String].Default: "". Input name.
                  value={currentItem.id} //Optional.[String].Default: "".
                  disabled={false} //Optional.[Bool].Default: false.
                  showSearch={true} // Optional.[Bool].Default: false. Show a search box in order to find option quickly.
                  fields={['name', 'locale', 'displayText', 'englishName']} // Optional.[array].Default: ['name']. Fields for search filtering.
                  // keyword={''} // Optional.[String].Default: ''. Show a keyword for search box.
                  showArrow={true} //Optional.[Bool].Default: true.
                  animate={true} //Optional.[Bool].Default: false.
                  optionList={FLAG_SELECTOR_OPTION_LIST} //Required.[Array of Object(s)].Default: [].
                  // selectOptionListItemHtml={<div>us</div>} //Optional.[Html].Default: none. The custom select options item html that will display in dropdown list. Use it if you think the default html is ugly.
                  // selectHtml={<div>us</div>} //Optional.[Html].Default: none. The custom html that will display when user choose. Use it if you think the default html is ugly.
                  classNameWrapper="" //Optional.[String].Default: "".
                  classNameContainer="" //Optional.[String].Default: "".
                  classNameOptionListContainer="" //Optional.[String].Default: "".
                  classNameOptionListItem="" //Optional.[String].Default: "".
                  classNameDropdownIconOptionListItem={''} //Optional.[String].Default: "".
                  customStyleWrapper={{}} //Optional.[Object].Default: {}.
                  customStyleContainer={{ border: 'none', fontSize: '12px' }} //Optional.[Object].Default: {}.
                  customStyleSelect={{ width: '100px' }} //Optional.[Object].Default: {}.
                  customStyleOptionListItem={{}} //Optional.[Object].Default: {}.
                  customStyleOptionListContainer={{ maxHeight: '100px', overflow: 'auto', width: '100px' }} //Optional.[Object].Default: {}.
                  onChange={areaCode => {
                    this.setState({ areaCode: areaCode }, () => {
                      this.handlePhoneChange(phone);
                    });
                  }}
                  // onBlur={() => {}} //Optional.[Func].Default: none.
                  // onFocus={(e) => {console.log(e)}} //Optional.[Func].Default: none.
                  // onClick={(e) => {console.log(e)}} //Optional.[Func].Default: none.
                />
              </div>
              <Textbox
                attributesInput={{
                  id: 'phone',
                  placeholder: 'Place your phone here ^-^',
                  type: 'text',
                }}
                customStyleWrapper={{ height: '100%' }}
                customStyleContainer={{ height: '100%' }}
                customStyleInput={{
                  paddingTop: '0',
                  paddingBottom: '0',
                  height: '45px',
                  paddingLeft: '100px',
                  paddingRight: '20px',
                }}
                value={phone}
                validate={validate}
                validationCallback={res =>
                  this.setState({
                    hasPhoneError: res,
                    validate: false,
                  })
                }
                onChange={res => {
                  this.handlePhoneChange(res);
                }}
                onBlur={() => {}}
                validationOption={{
                  check: true,
                  required: true,
                  customFunc: phone => {
                    if (validator.isMobilePhone(`${areaCode}${phone}`, currentItem.locale)) {
                      return true;
                    } else {
                      return `Invalid phone format for ${currentItem.locale}`;
                    }
                  },
                }}
              />
            </div>
            <div style={{ height: '20px' }} />
            <div className={`${STYLES['my-button']} ${STYLES['my-button__red']} ${STYLES['save-button']}`} onClick={this.submit}>
              Submit
            </div>
            <input type="submit" style={{ display: 'none' }} />
          </form>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
