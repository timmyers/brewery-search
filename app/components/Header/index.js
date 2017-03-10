import React from 'react';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

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
      //<HeaderLink to="/">Home</HeaderLink>
      //<HeaderLink to="/login">Log In</HeaderLink>

export { HeaderLink };
export default Header;
