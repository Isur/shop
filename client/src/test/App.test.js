import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import App from '../App';
import { ToastContainer, toast } from 'react-toastify';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

describe('App component testing', function() {
  it('should have ToastContainer for notifications', function() {
    const wrapper = shallow(<App />); 
    const welcome = <ToastContainer />;
    expect(wrapper.contains(welcome)).to.equal(true);
  });
});