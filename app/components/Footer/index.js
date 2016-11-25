import React from 'react'

import HorizontalFlex from 'components/HorizontalFlex';
import FooterText from './FooterText';

export const Header = () => (
	<HorizontalFlex backgroundColor="#C04800">
		<FooterText>
			{"© 2016 Tim Myers All Rights Reserved."}
		</FooterText>
	</HorizontalFlex>
);

export default Header
