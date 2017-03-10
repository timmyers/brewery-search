import React from 'react';
import HorizontalFlex from 'components/HorizontalFlex';
import Paper from 'material-ui/Paper';

const style = {
  width: '100%',
  height: '30px',
};

export const Header = () => (
  <Paper style={style} zDepth={0}>
    <HorizontalFlex full backgroundColor="#C04800">
      {'© 2016 Tim Myers All Rights Reserved.'}
    </HorizontalFlex>
  </Paper>
);

export default Header;
