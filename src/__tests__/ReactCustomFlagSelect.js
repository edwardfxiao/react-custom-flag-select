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
  { id: 'ca', name: 'CA', displayText: 'CA', flag: 'https://dummyimage.com/600x400/000/fff' },
];
