import React from 'react';

import GoogleMap from 'google-map-react';

import CoreLayout from 'layouts/CoreLayout';

const HomePage = () => (
  <CoreLayout>
    <GoogleMap
      bootstrapURLKeys={{
        key: "AIzaSyDk64oknr1zOjz-loIogxns15U1ZWV5luc"
      }}
      defaultCenter={ {lat: 39.75072, lng: -104.992504} }
      zoom={14}
    >
    </GoogleMap>
    <span>tester</span>
  </CoreLayout>
);

export default HomePage;