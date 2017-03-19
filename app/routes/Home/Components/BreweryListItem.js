import React from 'react';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import HorizontalFlex from 'components/HorizontalFlex';

import { visitBrewery } from 'api/actions';


const imgStyle = {
  width: '40px',
  height: '40px',
  margin: '0px 10px',
};

const styles = {
  holder: {
    width: '100%',
    height: '60px',
  },

  checkbox: {
    width: '30px',
    marginLeft: 'auto',
    marginRight: '20px',
  },
};

const BreweryListItem = (props) => {
  const brewery = props.brewery;

  const onCheckboxChecked = (e, isInputChecked) => {
    visitBrewery(brewery.breweryID, isInputChecked);
  };

  return (
    <Paper style={styles.holder} zDepth={1}>
      <HorizontalFlex full justifyContent="flex-start">
        <img style={imgStyle} src={brewery.imgSrc} alt={brewery.name} />
        <span>
          {brewery.name}
        </span>
        <Checkbox style={styles.checkbox} checked={brewery.visited} onCheck={onCheckboxChecked} />
      </HorizontalFlex>
    </Paper>
  );
};

export default BreweryListItem;
