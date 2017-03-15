import React from 'react';
import { orange500 } from 'material-ui/styles/colors';

import HorizontalFlex from 'components/HorizontalFlex';

const Header = ({ title }) => (
  <HorizontalFlex fullWidth height="40px" backgroundColor={orange500}>
    <span color="white">
      {title}
    </span>
  </HorizontalFlex>
);

export default Header;
