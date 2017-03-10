import React from 'react';
import AppBar from 'material-ui/AppBar';

import HorizontalFlex from 'components/HorizontalFlex';

import HeaderLink from './HeaderLink';

const Header = () => (
  <AppBar
    title={<span>Colorado Brewery Map</span>}
    iconElementLeft={<div />}
    iconElementRight={
      <HorizontalFlex>
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink to="/login">Log In</HeaderLink>
      </HorizontalFlex>
    }
  />
);

export { HeaderLink };
export default Header;
