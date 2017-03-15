import React from 'react';
import AppBar from 'material-ui/AppBar';

import HorizontalFlex from 'components/HorizontalFlex';

import HeaderLink from './HeaderLink';

const Header = ({ user }) => (
  <AppBar
    title={<span>Colorado Brewery Map</span>}
    iconElementLeft={<div />}
    iconElementRight={
      <HorizontalFlex>
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink to={user === null ? '/login' : '/profile'}>
          { user === null ? 'Log In' : 'Profile' }
        </HeaderLink>
      </HorizontalFlex>
    }
  />
);

export default Header;
