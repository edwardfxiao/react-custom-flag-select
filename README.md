# react-custom-flag-select

A react custom flag (country code) select.
# <img src="http://oc54ddm6x.bkt.clouddn.com/1851537437510_.pic.jpg" />

# Online Demo
<a href="https://edwardfhsiao.github.io/react-custom-flag-select/">Online demo example</a>

# Codesandbox Examples
* <a href="https://codesandbox.io/s/jvw9nvyzv">Playground</a>

# Thanks
#### This project is inspired by <a href="https://github.com/ekwonye-richard/react-flags-select">ekwonye-richard/react-flags-select</a>
#### Flag images: <a href="https://github.com/ekwonye-richard/react-flags-select/tree/master/flags">https://github.com/ekwonye-richard/react-flags-select/tree/master/flags</a>

# Why another flag select?
This component supports fully customized html. It focuses on the data you provided and handles the **country code** or **area code** only. Not like <a href="https://github.com/mukeshsoni/react-telephone-input">react-telephone-input</a> validate whole value along with the phone number without separation from 'area code' and 'phone number', which sometimes could be really painful when you are trying to handle them in your own way. 

In case the **country code** or the **area code** or even the **flags** might be wrong inside a library, why don't providing them yourself?

# Docs Link
[ReactCustomFlagSelect](#ReactCustomFlagSelect)

### <a name="ReactCustomFlagSelect"></a>ReactCustomFlagSelect

|Props                             |       |Type    |Description                                  |Default     |
|---                               |---    |---     |---                                          |  ---       |
|tabIndex                          |  Opt  |  Str   |                                             |  -1        |
|id                                |  Opt  |  Str   |                                             |  ""        |
|name                              |  Opt  |  Str   |                                             |  ""        |
|type                              |  Opt  |  Str   |                                             |  "text"    |
|value                             |  Opt  |  Str   |                                             |  ""        |
|disabled                          |  Opt  |  Bool  |                                             |  false     |
|**optionList**                    |**Req**|**Array**|**[{id: "1", name: "United States", displayText: "US(1)", flag: "us.svg"}, {id: "86", name: "中国", displayText: "中国(86)", flag: "cn.svg"}]**              |**[]**          |
|classNameSelect                   |  Opt  |  Str   |                                             |  ""        |
|classNameWrapper                  |  Opt  |  Str   |                                             |  ""        |
|classNameContainer                |  Opt  |  Str   |                                             |  ""        |
|classNameOptionListContainer      |  Opt  |  Str   |                                             |  ""        |
|classNameOptionListItem           |  Opt  |  Str   |                                             |  ""        |
|customStyleSelect                 |  Opt  |  Obj   |                                             |  {}        |
|customStyleWrapper                |  Opt  |  Obj   |                                             |  {}        |
|customStyleContainer              |  Opt  |  Obj   |                                             |  {}        |
|customStyleOptionListContainer    |  Opt  |  Obj   |                                             |  {}        |
|customStyleOptionListItem         |  Opt  |  Obj   |                                             |  {}        |
|**onChange**                      |**Req**|**Func**|                                             |**(val, e) => {}**|
|**onBlur**                        |**Opt**|**Func**|                                             |**none**    |
|onFocus                           |  Opt  |  Func  |                                             |  none      |
|onClick                           |  Opt  |  Func  |                                             |  none      |
|**selectHtml**                    |**Opt**|**Html**|**The custom html that will display when user choose. Use it if you think the default html is ugly.**|**none**    |
|**selectOptionListItemHtml**      |**Opt**|**Html**|**The custom select options item html that will display in dropdown list. Use it if you think the default html is ugly.**|**none**    |

```js
import ReactCustomFlagSelect from 'react-custom-flag-select';
import "react-custom-flag-select/lib/react-custom-flag-select.min.css";

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

const FLAG_SELECTOR_OPTION_LIST = [
  { id: '1', name: 'US', displayText: 'US(1)', locale: 'en-US', flag: require('../src/image/flags/us.svg') },
  { id: '86', name: '中国', displayText: '中国(86)', locale: 'zh-CN', flag: require('../src/image/flags/cn.svg') }
];

const { areaCode, phone, validate } = this.state;
const currentItem = find(FLAG_SELECTOR_OPTION_LIST, { id: areaCode })[0];

 <ReactCustomFlagSelect
   tabIndex={'1'} //Optional.[String or Number].Default: -1.
   id={'areaCode'} //Optional.[String].Default: "". Input ID.
   name={'areaCode'} //Optional.[String].Default: "". Input name.
   value={currentItem.id} //Optional.[String].Default: "".
   disabled={false} //Optional.[Bool].Default: false.
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
   customStyleSelect={{ width: '60px' }} //Optional.[Object].Default: {}.
   customStyleOptionListItem={{}} //Optional.[Object].Default: {}.
   customStyleOptionListContainer={{}} //Optional.[Object].Default: {}.
   customStyleDropdownIcon={{}} //Optional.[Object].Default: {}.
   onChange={areaCode => {
     this.setState({ areaCode: areaCode }, () => {
       this.handlePhoneChange(phone);
     });
   }}
   // onBlur={() => {}} //Optional.[Func].Default: none.
   // onFocus={(e) => {console.log(e)}} //Optional.[Func].Default: none.
   // onClick={(e) => {console.log(e)}} //Optional.[Func].Default: none.
 />
```
