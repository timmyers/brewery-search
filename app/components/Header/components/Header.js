import React from 'react';
import AppBar from 'material-ui/AppBar';

import HorizontalFlex from 'components/HorizontalFlex';

import HeaderLink from './HeaderLink';

const Header = ({ loggedIn, admin }) => (
  <AppBar
    title={<span>Colorado Brewery Map</span>}
    iconElementLeft={<div />}
    iconElementRight={
      <HorizontalFlex>
        <HeaderLink to="/">Home</HeaderLink>
        {admin &&
          <HeaderLink to="/addBrewery">Add Brewery</HeaderLink>
        }
        <HeaderLink to={loggedIn ? '/login' : '/profile'}>
          { loggedIn ? 'Log In' : 'Profile' }
        </HeaderLink>
      </HorizontalFlex>
    }
  />
);

export default Header;
