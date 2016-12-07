import React from 'react'

import HorizontalFlex from 'components/HorizontalFlex';
import FooterText from './FooterText';
import FooterDiv from './FooterDiv'

export const Header = () => (
	<FooterDiv backgroundColor="#C04800">
		<FooterText>
			{"© 2016 Tim Myers All Rights Reserved."}
		</FooterText>
	</FooterDiv>
);

export default Header
