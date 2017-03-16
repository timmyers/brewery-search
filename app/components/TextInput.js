import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const TextInput = props => (
  <TextField
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    {...props}
  />
);

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export default TextInput;
