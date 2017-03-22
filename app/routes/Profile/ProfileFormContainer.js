import React from 'react';
import SimpleLayout from 'layouts/SimpleLayout';
import ProfileForm from './components/ProfileForm';

const ProfileFormContainer = ({ user, numBreweries, numVisitedBreweries, logout }) => (
  <SimpleLayout>
    <ProfileForm
      user={user}
      numBreweries={numBreweries}
      numVisitedBreweries={numVisitedBreweries}
      logout={logout}
    />
  </SimpleLayout>
);

export default ProfileFormContainer;
