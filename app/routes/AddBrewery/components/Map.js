import React from 'react';
import GoogleMap from 'google-map-react';
import { connect } from 'react-redux';
import { MapsAddLocation } from 'material-ui/svg-icons';

const markerStyle = {
  position: 'relative',
  width: 50,
  height: 50,
  top: -50,
  left: -25,
};

const Map = ({ result }) => {
  const lat = result ? result.geometry.location.lat() : 39.711439;
  const lng = result ? result.geometry.location.lng() : -104.992366;

  return (
    <GoogleMap
      bootstrapURLKeys={{
        key: 'AIzaSyDk64oknr1zOjz-loIogxns15U1ZWV5luc',
      }}
      center={{ lat, lng }}
      zoom={16}
    >
      {result &&
        <MapsAddLocation lat={lat} lng={lng} color="orange" style={markerStyle} />
      }
    </GoogleMap>
  );
};


const mapStateToProps = state => ({
  result: state.addBrewery.searchResult,
});

export default connect(mapStateToProps)(Map);
