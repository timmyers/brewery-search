import React from 'react';
import Paper from 'material-ui/Paper'

import VerticalFlex from 'components/VerticalFlex';

const style = {
	width: '100%',
	height: '60px'
};

const BreweryListItem = (props) => {
	let brewery = props.brewery;

	return (
    <Paper style={style} zDepth={1} rounded={false}>
    	<VerticalFlex>
	      <span>{brewery.name}</span>
      </VerticalFlex>
    </Paper>
  )
};

export default BreweryListItem;