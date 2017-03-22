import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { push } from 'connected-react-router';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import FormTextField from 'components/FormTextField';
import TitledBox from 'components/TitledBox';
import { login } from 'api/actions';

const validate = (values) => {
  const errors = {};

  if (!values.username) errors.username = 'Username is required';
  if (!values.password) errors.password = 'Password is required';

  return errors;
};

const LoginForm = (props) => {
  const { handleSubmit, submitting, handleRegister } = props;

  return (
    <TitledBox title="Login">
      <Field name="username" component={FormTextField} floatingLabelText="Username" />
      <Field name="password" type="password" component={FormTextField} floatingLabelText="Password" />
      {submitting ?
        <CircularProgress />
      :
        <RaisedButton primary label="Login" onTouchTap={handleSubmit} />
      }
      <FlatButton label="No Account?" secondary onTouchTap={handleRegister} />
    </TitledBox>
  );
};

const mapDispatchToProps = {
  handleRegister: () => dispatch => dispatch(push('/register')),
};

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'login',
  validate,
  onSubmit: fields => login(fields),
  onSubmitSuccess: (result, dispatch) => {
    dispatch(push('/'));
  },
})(LoginForm));
