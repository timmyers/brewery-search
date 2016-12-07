import React from 'react'

import Text from 'components/Text';
import VerticalFlex from 'components/VerticalFlex';
import Button from 'components/Button';
import LoginInput from './LoginInput';
import Holder from './Holder';

const LoginPage = () => (
	<Holder>
		<Text>
			Log In:
		</Text>
		<LoginInput />
		<LoginInput />
		<Button>Submit</Button>
  </Holder>
);

export default LoginPage;