import React from 'react'
import HeaderLink from './HeaderLink'

import HorizontalFlex from 'components/HorizontalFlex';
import Text from 'components/Text';

import HeaderDiv from './HeaderDiv'

const Header = () => (
	<HeaderDiv>
		<HorizontalFlex width="20%">
		</HorizontalFlex>

		<HorizontalFlex width="20%">
			<HeaderLink to="/login">Log In</HeaderLink>
		</HorizontalFlex>
	</HeaderDiv>
);

export {HeaderLink}
export default Header
