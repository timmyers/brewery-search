import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'

import { reducer, mapBoundsChanged } from './Logic';

import Map from './Components/Map';
import BreweryListItem from './Components/BreweryListItem';
import CoreLayout from 'layouts/CoreLayout';
import VerticalFlex from 'components/VerticalFlex';
    

const HomePage = (props) => {
  let breweries = props.breweries;

  let onMapBoundsChange = (topLat, leftLng, bottomLat, rightLng) => {
    props.mapBoundsChanged({topLat, leftLng, bottomLat, rightLng});
  }

  return (
    <CoreLayout>
      <Map onBoundsChange={onMapBoundsChange}>
        {breweries.map(brewery =>
          <img src={brewery.imgSrc} lat={brewery.lat} lng={brewery.lng} width="40px" height="40px"/>
        )}
      </Map>
      <VerticalFlex scroll={true} justifyContent="flex-start">
        {breweries.map(brewery =>
          <BreweryListItem brewery={brewery} />
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
  let bounds = state.map.bounds;

  if (bounds) {
    let {topLat, leftLng, bottomLat, rightLng} = bounds;

    breweries = breweries.filter(brewery => {
      return brewery.lat < topLat && brewery.lat > bottomLat &&
             brewery.lng > leftLng && brewery.lng < rightLng;
    })
  }

  return { breweries }
}

const mapDispatchToProps = {
  mapBoundsChanged
}

export {reducer}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);