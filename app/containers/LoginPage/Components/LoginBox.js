import React from 'react'

import VerticalFlex from 'components/VerticalFlex';
import HorizontalFlex from 'components/HorizontalFlex';
import Button from 'components/Button';
import LoginInput from './LoginInput';
import Holder from './Holder';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import {orange500} from 'material-ui/styles/colors';

const Header = () => (
	<HorizontalFlex 
		backgroundColor={orange500}
		height="40px"
	>
		<span color="white">
			Log In
		</span>
	</HorizontalFlex>
);

const LoginPage = (props) => (
	<Holder>
		<Header />
			<LoginInput
				label="Username"
			/>
			<LoginInput
				label="Password"
			/>
		<RaisedButton primary={true} label="Submit" onClick={() => props.validateUsername("timmy")}/>
    <FlatButton label="No Account?" secondary={true} />
  </Holder>
);

export default LoginPage;