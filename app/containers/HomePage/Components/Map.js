import React, { PropTypes, Component } from 'react';

import GoogleMap from 'google-map-react';

const Map = (props) => {
	let onBoundsChange = (center, zoom, bounds, marginBounds) => {
    let [topLat, leftLng, bottomLat, rightLng] = bounds;
    if (props.onBoundsChange) {
    	props.onBoundsChange(topLat, leftLng, bottomLat, rightLng);
    }
  }

	return (
    <GoogleMap
      bootstrapURLKeys={{
        key: "AIzaSyDk64oknr1zOjz-loIogxns15U1ZWV5luc"
      }}
      center={ {lat: 39.761502, lng: -104.981076} }
      zoom={16}
      onBoundsChange={onBoundsChange}
    >
      {props.children}
    </GoogleMap>
  )
};

export default Map;