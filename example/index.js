import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import 'babel-polyfill';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Markdown from 'react-markdown';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import STYLES from '../src/css/example.css';
import { Textbox } from 'react-inputs-validation';
import validator from 'validator';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import ReactCustomFlagSelect from '../src/js/component/index.js';

const markdownExample = `
\`\`\`javascript
import ReactCustomFlagSelect from 'react-custom-flag-select';
import "react-custom-flag-select/lib/react-custom-flag-select.min.css";
import { Textbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';

const FLAG_SELECTOR_OPTION_LIST = [
  { id: '1', name: 'US', displayText: 'US(1)', locale: 'en-US', flag: require('../src/image/flags/us.svg') },
  { id: '86', name: '中国', displayText: '中国(86)', locale: 'zh-CN', flag: require('../src/image/flags/cn.svg') }
];

const DEFAULT_AREA_CODE = FLAG_SELECTOR_OPTION_LIST[0].id;

const find = (arr, obj) => {
  const res = [];
  arr.forEach(o => {
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

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { areaCode: DEFAULT_AREA_CODE, phone: '', hasPhoneError: true, validate: false };

...

  render() {
    const { areaCode, phone, validate } = this.state;
    const currentItem = find(FLAG_SELECTOR_OPTION_LIST, { id: areaCode })[0];
    return (

          ...

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '0', top: '10px', zIndex: '1' }}>
                <ReactCustomFlagSelect
                  tabIndex={'1'} //
                  id={'areaCode'} //
                  name={'areaCode'} //
                  value={currentItem.id} //
                  disabled={false} //
                  animate={true} //Optional.[Bool].Default: false.
                  optionList={FLAG_SELECTOR_OPTION_LIST} //
                  // selectOptionListItemHtml={<div>us</div>}//
                  classNameWrapper={''} //
                  classNameContainer={''} //
                  classNameOptionListItem={''} //
                  classNameOptionListContainer={''} //
                  classNameDropdownIconOptionListItem={''} //
                  customStyleWrapper={{}} //
                  customStyleContainer={{ border: 'none', fontSize: '12px' }} //Optional.[Object].Default: {}.
                  customStyleSelect={{ width: '100px' }} //Optional.[Object].Default: {}.
                  customStyleOptionListItem={{}} //Optional.[Object].Default: {}.
                  customStyleOptionListContainer={{ maxHeight: '100px', overflow: 'auto', width: '120px', marginTop: '11px' }} //Optional.[Object].Default: {}.
                  onChange={areaCode => {
                    this.setState({ areaCode: areaCode }, () => {
                      this.handlePhoneChange(phone);
                    });
                  }}
                />
              </div>
              <Textbox
                tabIndex="1"
                id="phone"
                customStyleWrapper={{ height: '100%' }}
                customStyleContainer={{ height: '100%' }}
                customStyleInput={{
                  paddingTop: '0',
                  paddingBottom: '0',
                  height: '45px',
                  paddingLeft: '90px',
                  paddingRight: '20px'
                }}
                value={phone}
                validate={validate}
                validationCallback={res =>
                  this.setState({
                    hasPhoneError: res,
                    validate: false
                  })
                }
                type="text"
                placeholder="Please enter your phone number"
                onChange={res => {
                  this.handlePhoneChange(res);
                }}
                onBlur={() => {}}
                validationOption={{
                  check: true,
                  required: true,
                  customFunc: phone => {
                    if (validator.isMobilePhone(areaCode + phone, currentItem.locale)) {
                      return true;
                    } else {
                      return 'Invalid phone format for ' + currentItem.locale;
                    }
                  }
                }}
              />
            </div>


...


\`\`\`
`;

const CodeBlock = ({ literal, language }) => {
  var html = Prism.highlight(literal, Prism.languages[language]);
  var cls = 'language-' + language;

  return (
    <pre className={cls}>
      <code dangerouslySetInnerHTML={{ __html: html }} className={cls} />
    </pre>
  );
};

CodeBlock.propTypes = {
  literal: PropTypes.string,
  language: PropTypes.string
};

const FLAG_SELECTOR_OPTION_LIST = [
  { id: '1', name: 'US', displayText: 'US(1)', locale: 'en-US', flag: require('../src/image/flags/us.svg') },
  { id: '86', name: '中国', displayText: '中国(86)', locale: 'zh-CN', flag: require('../src/image/flags/cn.svg') }
];

const DEFAULT_AREA_CODE = FLAG_SELECTOR_OPTION_LIST[0].id;

const find = (arr, obj) => {
  const res = [];
  arr.forEach(o => {
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
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '0', top: '10px', zIndex: '1' }}>
                <ReactCustomFlagSelect
                  tabIndex={'1'} //Optional.[String or Number].Default: -1.
                  id={'areaCode'} //Optional.[String].Default: "". Input ID.
                  name={'areaCode'} //Optional.[String].Default: "". Input name.
                  value={currentItem.id} //Optional.[String].Default: "".
                  disabled={false} //Optional.[Bool].Default: false.
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
                  customStyleOptionListContainer={{ maxHeight: '100px', overflow: 'auto', width: '120px', marginTop: '11px' }} //Optional.[Object].Default: {}.
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
                tabIndex="1"
                id="phone"
                customStyleWrapper={{ height: '100%' }}
                customStyleContainer={{ height: '100%' }}
                customStyleInput={{
                  paddingTop: '0',
                  paddingBottom: '0',
                  height: '45px',
                  paddingLeft: '100px',
                  paddingRight: '20px'
                }}
                value={phone}
                validate={validate}
                validationCallback={res =>
                  this.setState({
                    hasPhoneError: res,
                    validate: false
                  })
                }
                type="text"
                placeholder="Please enter your phone number"
                onChange={res => {
                  this.handlePhoneChange(res);
                }}
                onBlur={() => {}}
                validationOption={{
                  check: true,
                  required: true,
                  customFunc: (phone) => {
                    if (validator.isMobilePhone(`${areaCode}${phone}`, currentItem.locale)) {
                      return true;
                    } else {
                      return `Invalid phone format for ${currentItem.locale}`;
                    }
                  }
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
        <div>
          <div>
            <Markdown source={markdownExample} renderers={{ CodeBlock }} />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
