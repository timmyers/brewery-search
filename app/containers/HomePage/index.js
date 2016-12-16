import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'

import GoogleMap from 'google-map-react';

import CoreLayout from 'layouts/CoreLayout';

const HomePage = (props) => (
  <CoreLayout>
    <GoogleMap
      bootstrapURLKeys={{
        key: "AIzaSyDk64oknr1zOjz-loIogxns15U1ZWV5luc"
      }}
      defaultCenter={ {lat: 39.761502, lng: -104.981076} }
      zoom={16}
    >
      {props.breweries && props.breweries.map(brewery =>
        <img src={brewery.imgSrc} lat={brewery.lat} lng={brewery.lng} width="20px" height="20px"/>
      )}
    </GoogleMap>
    <span>tester</span>
  </CoreLayout>
);

HomePage.propTypes = {
  breweries: PropTypes.array
}

const mapStateToProps = (state) => ({
  breweries : state.api.breweries
})

export default connect(mapStateToProps)(HomePage);