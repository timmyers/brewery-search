import React from 'react';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import FormTextField from 'components/FormTextField';
import TitledBox from 'components/TitledBox';
import { register } from 'api/actions';

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Username is required';
  } else if (values.username.length < 4) {
    errors.username = 'Username must be at least 4 characters long';
  } else if (values.username.length > 20) {
    errors.username = 'Username must be at most 20 characters long';
  }

  // Validate password
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Username must be at least 8 characters long';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const RegisterForm = (props) => {
  const { handleSubmit, submitting } = props;

  return (
    <TitledBox title="Register">
      <Field name="username" component={FormTextField} floatingLabelText="Username" />
      <Field name="email" component={FormTextField} floatingLabelText="Email" />
      <Field name="password" type="password" component={FormTextField} floatingLabelText="Password" />
      {submitting ?
        <CircularProgress />
      :
        <RaisedButton primary label="Submit" onTouchTap={handleSubmit} />
      }
    </TitledBox>
  );
};

const RegisterFormRedux = reduxForm({
  form: 'register',
  validate,
  onSubmit: fields => register(fields),
  // onSubmitFail: (errors, dispatch, submitError) => {
    //if (submitError instanceof Error) {
      // alert(submitError.message);
    //}
  // },
})(RegisterForm);

export default RegisterFormRedux;
