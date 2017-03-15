import React from 'react';
import SimpleLayout from 'layouts/SimpleLayout';
import ProfileForm from './components/ProfileForm';

const ProfileFormContainer = ({ user, logout }) => (
  <SimpleLayout>
    <ProfileForm user={user} logout={logout} />
  </SimpleLayout>
);

export default ProfileFormContainer;
