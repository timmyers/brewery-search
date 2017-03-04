import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'

import { reducer, mapBoundsChanged, childMouseEntered, childMouseLeft} from './Logic';

import Map from './Components/Map';
import MapMarker from './Components/MapMarker';
import BreweryListItem from './Components/BreweryListItem';
import CoreLayout from 'layouts/CoreLayout';
import VerticalFlex from 'components/VerticalFlex';
    

const HomePage = (props) => {
  let breweries = props.breweries;
  let hoveredBreweryID = props.hoveredBreweryID;

  let onMapBoundsChange = (topLat, leftLng, bottomLat, rightLng) => {
    props.mapBoundsChanged({topLat, leftLng, bottomLat, rightLng});
  }

  let onChildMouseEnter = childProps => {
    props.childMouseEntered(childProps);
  }

  let onChildMouseLeft = childProps => {
    props.childMouseLeft(childProps);
  }

  return (
    <CoreLayout>
      <Map 
        onBoundsChange={onMapBoundsChange}
        onChildMouseEnter={onChildMouseEnter}
        onChildMouseLeave={onChildMouseLeft}
      >
        {breweries.map(brewery =>
          <MapMarker lat={brewery.lat} lng={brewery.lng}  brewery={brewery} />
        )}
      </Map>
      <VerticalFlex scroll={true} justifyContent="flex-start">
        {breweries.map(brewery =>
          <BreweryListItem brewery={brewery} bold={hoveredBreweryID == brewery.breweryID} />
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
  let hoveredBreweryID = state.map.hoveredBreweryID;

  if (bounds) {
    let {topLat, leftLng, bottomLat, rightLng} = bounds;

    breweries = breweries.filter(brewery => {
      return brewery.lat < topLat && brewery.lat > bottomLat &&
             brewery.lng > leftLng && brewery.lng < rightLng;
    })
  }

  return { breweries, hoveredBreweryID };
}

const mapDispatchToProps = {
  mapBoundsChanged,
  childMouseEntered,
  childMouseLeft
}

export {reducer}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);