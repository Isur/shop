import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Login from '../../Components/Login';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

describe('App component testing', function() {
  it('should have header', function() {
    const wrapper = shallow(<Login />); 
    expect(wrapper.exists()).to.equal(true);
  });
});