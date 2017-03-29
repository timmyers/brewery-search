import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import VerticalFlex from 'components/VerticalFlex';
import { addBrewery } from 'api/actions';

const style = {
  width: '90%',
  height: '500px',
  marginTop: '20px',
};

const imageStyle = {
  width: 30,
  height: 30,
  marginBotto: 20,
};

const SearchResult = (props) => {
  const { result, imageURL, imageDrop } = props;
  const lat = result && result.geometry.location.lat();
  const lng = result && result.geometry.location.lng();

  const onDrop = (event) => {
    try {
      event.preventDefault();
      event.stopPropagation();
      const html = event.dataTransfer.getData('text/html');
      const imgSrc = html.match(/<img.*src="([^"]*)"/i);
      imageDrop(imgSrc[1]);
    } catch (e) {
      console.log('exception parsing drop result: ', e);
    }
  };

  const handleSubmit = async () => {
    await addBrewery({
      name: result.name,
      lat,
      lng,
      imgSrc: imageURL,
    });
  };

  return (
    <Paper style={style}>
      {result &&
        <VerticalFlex full>
          <div key={result.name}>
            <TextField floatingLabelText="Name" defaultValue={result.name} />
          </div>
          <TextField floatingLabelText="Lat" value={lat} />
          <TextField floatingLabelText="Lng" value={lng} />
          <TextField floatingLabelText="Image Source" value={imageURL} onDrop={onDrop} />
          <img src={imageURL} alt="" style={imageStyle} />
          <RaisedButton primary label="Add Brewery" onTouchTap={handleSubmit} />
        </VerticalFlex>
      }
    </Paper>
  );
};

export default SearchResult;
