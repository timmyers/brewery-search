import React from 'react'
import HeaderLink from './HeaderLink'

import FlatButton from 'material-ui/FlatButton';
import HorizontalFlex from 'components/HorizontalFlex';


import HeaderDiv from './HeaderDiv'

const Header = () => (
	<HeaderDiv>
		<HorizontalFlex width="20%">
		</HorizontalFlex>

		<HorizontalFlex width="60%">
			<HeaderLink to="/">Home</HeaderLink>
			<HeaderLink to="/about">About</HeaderLink>
		</HorizontalFlex>

		<HorizontalFlex width="20%">
			<HeaderLink to="/login">Log In</HeaderLink>
		</HorizontalFlex>
	</HeaderDiv>
);

export {HeaderLink}
export default Header
