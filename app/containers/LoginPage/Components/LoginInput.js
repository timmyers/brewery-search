import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const LoginInput = props => (
  <TextField
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    {...props}
  />
);

LoginInput.propTypes = {
  label: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export default LoginInput;
