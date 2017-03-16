import React from 'react';
import { connect } from 'react-redux';

import SimpleLayout from 'layouts/SimpleLayout';

import LoginForm from './Containers/LoginFormContainer';
import { reducer } from './logic';

const Login = (props) => {
  const user = props.user;

  return (
    <SimpleLayout>
      {user ?
        <span>Logged In!</span>
      :
        <LoginForm />
      }
    </SimpleLayout>
  );
};

const mapStateToProps = state => ({
  user: state.api.state.user,
});

export default connect(mapStateToProps)(Login);

export { reducer };
