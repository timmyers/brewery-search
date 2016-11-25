import React from 'react'
import HeaderLink from './HeaderLink'

import HorizontalFlex from 'components/HorizontalFlex';

export const Header = () => (
	<HorizontalFlex>
		<HeaderLink to="/">Home</HeaderLink>
		{"-"}
		<HeaderLink to="/about">About</HeaderLink>
	</HorizontalFlex>
);

export default Header
