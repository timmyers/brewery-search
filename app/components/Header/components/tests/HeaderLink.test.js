/* eslint-disable */
import React from 'react';
import chai from 'chai';
import { shallow } from 'enzyme';

import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

import HeaderLink from '../HeaderLink';

chai.should();

describe('<HeaderLink />', () => {
  it('should render a FlatButton inside a Link', () => {
    const wrapper = shallow(<HeaderLink />);

    const linkWrapper = wrapper.find(Link);
    linkWrapper.should.have.length(1);

    linkWrapper.children().find(FlatButton).should.have.length(1);
  });

  it('should pass the \'to\' prop to the Link component', () => {
    const to = '/home';
    const wrapper = shallow(<HeaderLink to={to} />);
    wrapper.props().to.should.equal(to);
  });

  it('should render the children', () => {
    const wrapper = shallow(
      <HeaderLink>
        <span className="unique" />
      </HeaderLink>
    );
    wrapper.contains(<span className="unique" />).should.be.true;
  });
});
