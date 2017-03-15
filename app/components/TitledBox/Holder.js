import React from 'react';
import Paper from 'material-ui/Paper';
import VerticalFlex from 'components/VerticalFlex';

const style = {
  width: '300px',
  height: '400px',
  position: 'absolute',
};

const Holder = props => (
  <Paper style={style} zDepth={1}>
    <VerticalFlex full justifyContent="space-between">
      { props.children }
    </VerticalFlex>
  </Paper>
);

export default Holder;
