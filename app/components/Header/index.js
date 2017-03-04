import React from 'react';

import HorizontalFlex from 'components/HorizontalFlex';

import HeaderLink from './HeaderLink';
import HeaderDiv from './HeaderDiv';

const Header = () => (
  <HeaderDiv>
    <HorizontalFlex width="20%" />

    <HorizontalFlex width="60%">
      <HeaderLink to="/">Home</HeaderLink>
    </HorizontalFlex>

    <HorizontalFlex width="20%">
      <HeaderLink to="/login">Log In</HeaderLink>
    </HorizontalFlex>
  </HeaderDiv>
);

export { HeaderLink };
export default Header;
