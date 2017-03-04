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
}

const markerImageStyle = {
	position: 'absolute',
  width: MARKER_SIZE,
  height: MARKER_SIZE,
}

const markerLogoStyle = {
  position: 'absolute',
  width: IMAGE_SIZE,
  height: IMAGE_SIZE,
  left: (MARKER_SIZE / 2) - (IMAGE_SIZE / 2) - 1,
  top: 7,
}

const MapMarker = (props) => {
	const brewery = props.brewery;
	// const size = props.$hover ? "60px" : "40px";
	
	const logoSize = "15px";

	return (
		<div style={markerDivStyle}>
	    <img src={"http://www.tidydesign.com/img/free-map-marker-icons.png"} style={markerImageStyle} />
	    <img src={brewery.imgSrc} style={markerLogoStyle} />
    </div>
  )
};

export default MapMarker;

