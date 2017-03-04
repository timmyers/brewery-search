import React from 'react';

const MARKER_SIZE = 50;
const IMAGE_SIZE = 20;

const markerDivStyle = {
  position: 'absolute',
  width: MARKER_SIZE,
  height: MARKER_SIZE,
  left: -MARKER_SIZE / 2,
  top: -MARKER_SIZE,
  // backgroundColor: 'yellow'
};

const markerImageStyle = {
  position: 'absolute',
  width: MARKER_SIZE,
  height: MARKER_SIZE,
};

const markerLogoStyle = {
  position: 'absolute',
  width: IMAGE_SIZE,
  height: IMAGE_SIZE,
  left: (MARKER_SIZE / 2) - (IMAGE_SIZE / 2) - 1,
  top: 7,
};

const MapMarker = (props) => {
  const brewery = props.brewery;

  return (
    <div style={markerDivStyle}>
      <img src={'http://www.tidydesign.com/img/free-map-marker-icons.png'} style={markerImageStyle} alt="" />
      <img src={brewery.imgSrc} style={markerLogoStyle} alt={brewery.name} />
    </div>
  );
};

export default MapMarker;
