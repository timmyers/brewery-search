import React from 'react';
import Paper from 'material-ui/Paper';

import HorizontalFlex from 'components/HorizontalFlex';
import VerticalFlex from 'components/VerticalFlex';

const style = {
  width: '100%',
  flexShrink: 0,
};

const imgStyle = {
  width: 40,
  height: 40,
  marginRight: 10,
  marginLeft: 10,
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
      <VerticalFlex full>
        <HorizontalFlex full justifyContent="flex-start">
          <img style={imgStyle} src={brewery.imgSrc} alt={brewery.name} />
          <span>{brewery.name}</span>
        </HorizontalFlex>
      </VerticalFlex>
    </Paper>
  );
};

export default BreweryListItem;
