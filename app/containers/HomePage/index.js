import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'

import {reducer} from './Logic';

import Map from './Components/Map';
import CoreLayout from 'layouts/CoreLayout';
import VerticalFlex from 'components/VerticalFlex';
    

const HomePage = (props) => {
  let filteredBreweries = [];

  let onMapBoundsChange = (topLat, leftLng, bottomLat, rightLng) => {
    filteredBreweries = props.breweries.filter(brewery => {
      return brewery.lat < topLat && brewery.lat > bottomLat &&
             brewery.lng > leftLng && brewery.lng < rightLng;
    });
    // console.log(JSON.stringify(filteredBreweries));
    console.log(filteredBreweries.length)
  }

  return (
    <CoreLayout>
      <Map onBoundsChange={onMapBoundsChange}>
        {props.breweries.map(brewery =>
          <img src={brewery.imgSrc} lat={brewery.lat} lng={brewery.lng} width="40px" height="40px"/>
        )}
      </Map>
      <VerticalFlex>
        {filteredBreweries.map(brewery =>
          <span>{brewery.name}</span>
        )}
      </VerticalFlex>
    </CoreLayout>
  )
};

HomePage.propTypes = {
  breweries: PropTypes.array
}

const mapStateToProps = (state) => {
  let breweries = state.api.state.breweries || [];

  return { breweries }
}

export {reducer}
export default connect(mapStateToProps)(HomePage);