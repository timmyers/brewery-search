import React from 'react';
import { connect } from 'react-redux';

import CoreLayout from 'layouts/CoreLayout';
import VerticalFlex from 'components/VerticalFlex';
import Map from 'components/Map';

import { reducer, mapBoundsChanged, childMouseEntered, childMouseLeft } from './Logic';
import MapMarker from './Components/MapMarker';
import BreweryListItem from './Components/BreweryListItem';

const Home = (props) => {
  const breweries = props.breweries;
  const breweriesOnMap = props.breweriesOnMap;
  const hoveredBreweryID = props.hoveredBreweryID;

  const onMapBoundsChange = (topLat, leftLng, bottomLat, rightLng) => {
    props.mapBoundsChanged({ topLat, leftLng, bottomLat, rightLng });
  };

  const onChildMouseEnter = (childProps) => {
    props.childMouseEntered(childProps);
  };

  const onChildMouseLeft = (childProps) => {
    props.childMouseLeft(childProps);
  };

  return (
    <CoreLayout>
      <Map
        onBoundsChange={onMapBoundsChange}
        onChildMouseEnter={onChildMouseEnter}
        onChildMouseLeave={onChildMouseLeft}
      >
        {breweries.map(brewery =>
          <MapMarker lat={brewery.lat} lng={brewery.lng} brewery={brewery} />
        )}
      </Map>
      <VerticalFlex full scroll justifyContent="flex-start">
        {breweriesOnMap.map(brewery =>
          <BreweryListItem brewery={brewery} bold={hoveredBreweryID === brewery.breweryID} />
        )}
      </VerticalFlex>
    </CoreLayout>
  );
};

Home.propTypes = {
  // breweries: PropTypes.array,
};

const mapStateToProps = (state) => {
  const apiState = state.api.state;

  const breweries = apiState.breweries || [];
  let breweriesOnMap = breweries;
  const bounds = state.map.bounds;
  const hoveredBreweryID = state.map.hoveredBreweryID;

  if (bounds) {
    const { topLat, leftLng, bottomLat, rightLng } = bounds;

    breweriesOnMap = breweries.filter(brewery => (
      brewery.lat < topLat && brewery.lat > bottomLat &&
      brewery.lng > leftLng && brewery.lng < rightLng
    ));
  }

  const breweriesVisited = apiState.breweriesVisited;
  const visited = (breweriesVisited && breweriesVisited.visited) || [];
  breweriesOnMap = breweriesOnMap.map((breweryIn) => {
    const brewery = breweryIn;
    brewery.visited = visited.indexOf(brewery.breweryID) !== -1;
    return brewery;
  });

  return { breweries, breweriesOnMap, hoveredBreweryID };
};

const mapDispatchToProps = {
  mapBoundsChanged,
  childMouseEntered,
  childMouseLeft,
};

export { reducer };
export default connect(mapStateToProps, mapDispatchToProps)(Home);
