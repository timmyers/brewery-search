import React from 'react';
import GoogleMap from 'google-map-react';

const Map = (props) => {
  const onBoundsChange = (center, zoom, bounds) => {
    const [topLat, leftLng, bottomLat, rightLng] = bounds;
    if (props.onBoundsChange) {
      props.onBoundsChange(topLat, leftLng, bottomLat, rightLng);
    }
  };

  const onChildMouseEnter = (key, childProps) => {
    if (props.onChildMouseEnter) {
      props.onChildMouseEnter(childProps);
    }
  };

  const onChildMouseLeave = (key, childProps) => {
    if (props.onChildMouseLeave) {
      props.onChildMouseLeave(childProps);
    }
  };

  return (
    <GoogleMap
      bootstrapURLKeys={{
        key: 'AIzaSyDk64oknr1zOjz-loIogxns15U1ZWV5luc',
      }}
      center={{ lat: 39.711439, lng: -104.992366 }}
      zoom={10}
      onBoundsChange={onBoundsChange}
      onChildMouseEnter={onChildMouseEnter}
      onChildMouseLeave={onChildMouseLeave}
    >
      {props.children}
    </GoogleMap>
  );
};

export default Map;
