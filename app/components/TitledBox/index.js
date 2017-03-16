import React from 'react';
import Paper from 'material-ui/Paper';
import VerticalFlex from 'components/VerticalFlex';
import Header from './Header';

const style = {
  width: '300px',
  height: '400px',
  position: 'absolute',
};

const TitledBox = ({ title, children }) => (
  <Paper style={style} zDepth={1}>
    <VerticalFlex full>
      <Header title={title} />
      <VerticalFlex full justifyContent="space-around">
        { children }
      </VerticalFlex>
    </VerticalFlex>
  </Paper>
);

export default TitledBox;
