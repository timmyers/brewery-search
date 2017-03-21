import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import TitledBox from 'components/TitledBox';
import TextInput from 'components/TextInput';

const LoginForm = (props) => {
  const handleUsernameChange = e => props.usernameChanged(e.target.value);
  const handleUsernameFocus = () => props.usernameFocused();

  const handlePasswordChange = e => props.passwordChanged(e.target.value);
  const handlePasswordFocus = () => props.passwordFocused();

  const handleSubmit = () => props.login(props.username, props.password);
  const handleRegister = () => props.register();

  return (
    <TitledBox title="Log In">
      <TextInput
        onChange={handleUsernameChange}
        onFocus={handleUsernameFocus}
        errorText={props.usernameTouched ? props.usernameError : ''}
        label="Username"
      />
      <TextInput
        onChange={handlePasswordChange}
        onFocus={handlePasswordFocus}
        errorText={props.passwordTouched ? props.passwordError : ''}
        type="password"
        label="Password"
      />
      <RaisedButton primary label="Submit" onClick={handleSubmit} />
      <FlatButton label="No Account?" secondary onTouchTap={handleRegister} />
    </TitledBox>
  );
};

export default LoginForm;
