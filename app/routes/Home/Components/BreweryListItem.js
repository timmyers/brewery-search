import React from 'react';
// import Paper from 'material-ui/Paper';
import { Card, CardHeader } from 'material-ui/Card';

const style = {
  width: '100%',
};


const BreweryListItem = (props) => {
  const brewery = props.brewery;

  return (
    <Card style={style}>
      <CardHeader
        title={brewery.name}
        avatar={brewery.imgSrc}
      />
    </Card>
  );
};

export default BreweryListItem;
