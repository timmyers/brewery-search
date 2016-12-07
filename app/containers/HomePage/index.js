import React from 'react';

import GoogleMap from 'google-map-react';

import CoreLayout from 'layouts/CoreLayout';

const HomePage = () => (
  <CoreLayout>
    <GoogleMap
      defaultCenter={ {lat: 39.629727, lng: -104.900864} }
      zoom={14}
    >
    </GoogleMap>
    <span>hi</span>
  </CoreLayout>
);

export default HomePage;