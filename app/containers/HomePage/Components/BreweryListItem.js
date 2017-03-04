import React from 'react';
import Paper from 'material-ui/Paper';

import VerticalFlex from 'components/VerticalFlex';

const style = {
  width: '100%',
};

const BreweryListItem = (props) => {
  const brewery = props.brewery;
  const bold = props.bold;

  const realStyle = {
    ...style,
    backgroundColor: bold ? '#b4c9ea' : 'white',
    height: bold ? '100px' : '60px',
  };

  return (
    <Paper style={realStyle} zDepth={1} rounded={false}>
      <VerticalFlex>
        <span>{brewery.name}</span>
      </VerticalFlex>
    </Paper>
  );
};

export default BreweryListItem;
