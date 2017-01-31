import React from 'react'

import VerticalFlex from 'components/VerticalFlex';
import HorizontalFlex from 'components/HorizontalFlex';
import LoginInput from './LoginInput';
import Holder from './Holder';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {orange500} from 'material-ui/styles/colors';

const LoginHeader = () => (
	<HorizontalFlex 
		backgroundColor={orange500}
		height="40px"
	>
		<span color="white">
			Log In
		</span>
	</HorizontalFlex>
);

const LoginPage = (props) => {
	function handleUsernameChange(value) {
		props.usernameChanged(value);
	}

	function handleUsernameFocus(e) {
		props.usernameFocused()
	}

	function handlePasswordChange(value) {
		props.passwordChanged(value);
	}

	function handlePasswordFocus(e) {
		props.passwordFocused()
	}

	function handleSubmit() {
		props.login(props.username, props.password)
	}

	return (
		<Holder>
			<LoginHeader />
			<LoginInput
				onChange={ (e) => handleUsernameChange(e.target.value) }
				onFocus={ (e) => handleUsernameFocus(e)}
				errorText={props.usernameTouched ? props.usernameError : ""}
				label="Username"
			/>
			<LoginInput
				onChange={ (e) => handlePasswordChange(e.target.value) }
				onFocus={ (e) => handlePasswordFocus(e)}
				errorText={props.passwordTouched ? props.passwordError : ""}
				label="Password"
			/>
			<RaisedButton 
				primary={true} 
				label="Submit" 
				onClick={handleSubmit}
			/>
	    <FlatButton label="No Account?" secondary={true} />
	  </Holder>
	);
}

export default LoginPage;