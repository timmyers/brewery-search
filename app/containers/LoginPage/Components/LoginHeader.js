import React from 'react';
import { orange500 } from 'material-ui/styles/colors';

import HorizontalFlex from 'components/HorizontalFlex';

const LoginHeader = props => (
  <HorizontalFlex
    backgroundColor={orange500}
    height="40px"
  >
    <span color="white">
      {props.children}
    </span>
  </HorizontalFlex>
);

export default LoginHeader;
