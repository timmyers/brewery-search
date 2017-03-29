/* global google:true */
import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const autocompleteService = new google.maps.places.AutocompleteService();
const placesService = new google.maps.places.PlacesService(document.createElement('div'));

const searchForPlaces = (searchString, onResult) => {
  autocompleteService.getPlacePredictions({ input: searchString },
    (predictions, autocompleteStatus) => {
      if (autocompleteStatus === google.maps.places.PlacesServiceStatus.OK) {
        placesService.getDetails({ placeId: predictions[0].place_id },
          (place, detailsStatus) => {
            if (detailsStatus === google.maps.places.PlacesServiceStatus.OK) {
              onResult(place);
            }
          });
      }
    });
};

const SearchForm = ({ searchResult }) => (
  <TextField
    floatingLabelText="Search for a brewery"
    onChange={(e, newValue) => searchForPlaces(newValue, searchResult)}
  />
);

SearchForm.propTypes = {
  searchResult: PropTypes.func.isRequired,
};

export default SearchForm;
