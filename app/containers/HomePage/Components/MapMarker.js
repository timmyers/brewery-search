import React from 'react';

const MapMarker = (props) => {
	const brewery = props.brewery;
	// const size = props.$hover ? "60px" : "40px";
	const size = "40px";

	return (
    <img src={"http://www.tidydesign.com/img/free-map-marker-icons.png"} width={size} height={size}/>
  )
};

export default MapMarker;

