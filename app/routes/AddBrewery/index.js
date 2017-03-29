import React from 'react';

import CoreLayout from 'layouts/CoreLayout';
import VerticalFlex from 'components/VerticalFlex';

import { reducer } from './logic';

import SearchForm from './components/SearchForm';
import SearchResult from './components/SearchResult';
import Map from './components/Map';

const AddBrewery = () => (
  <CoreLayout>
    <Map />
    <VerticalFlex full justifyContent="flex-start">
      <SearchForm />
      <SearchResult />
    </VerticalFlex>
  </CoreLayout>
);

export { reducer };
export default AddBrewery;
