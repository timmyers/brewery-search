import React from 'react';
import Paper from 'material-ui/Paper'

import VerticalFlex from 'components/VerticalFlex';

const style = {
	width: '100%',
	height: '60px'
};

const BreweryListItem = (props) => {
	let brewery = props.brewery;
	let bold = props.bold;

	const realStyle = {
		...style,
		backgroundColor: bold ? 'blue': 'white'
	};

	return (
    <Paper style={realStyle} zDepth={1} rounded={false}>
    	<VerticalFlex>
	      <span>{brewery.name}</span>
      </VerticalFlex>
    </Paper>
  )
};

export default BreweryListItem;