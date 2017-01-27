import React from 'react'
import TextField from 'material-ui/TextField';

const LoginInput = props => (
	<TextField
      floatingLabelText={props.label}
      errorText={props.touched && props.error}
      {...props}
    />
);

export default LoginInput;