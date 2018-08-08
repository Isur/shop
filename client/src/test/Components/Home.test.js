import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Home from '../../Components/Home';
import { Header, Icon } from 'semantic-ui-react';
import Adapter from 'enzyme-adapter-react-16'
import lang from '../../Components/language/lang';
configure({ adapter: new Adapter() });

describe('App component testing', function() {
  it('should have header', function() {
    const wrapper = shallow(<Home />); 
    const header = <Header as='h1' color='yellow'><Icon name='shop' />{lang.homePage.shop}</Header>
    expect(wrapper.contains(header)).to.equal(true);
  });
});