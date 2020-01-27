import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';

describe('Nav', () => {
  let wrapper;

  beforeEach(() => wrapper = shallow(<Nav />));

  it('should render a Nav', () => {
    expect(wrapper.find('Div').length).toEqual(0);
  });

});