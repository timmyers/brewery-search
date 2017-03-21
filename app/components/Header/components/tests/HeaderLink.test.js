import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';

import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

import HeaderLink from '../HeaderLink';

chai.should();

describe('<HeaderLink />', () => {
  it('should render a flat button inside a link', () => {
    const wrapper = shallow(<HeaderLink />);

    const linkWrapper = wrapper.find(Link);
    linkWrapper.should.have.length(1);

    linkWrapper.children().find(FlatButton).should.have.length(1);
  });
});
