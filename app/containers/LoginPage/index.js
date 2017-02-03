import React from 'react';

import SimpleLayout from 'layouts/SimpleLayout';

import LoginForm from './Containers/LoginFormContainer';

import {reducer, loginResponse} from './Logic';

const LoginPage = () => (
	<SimpleLayout>
		{true ?
			<LoginForm>
			</LoginForm>
		:
			<span>Register</span>
		}
  </SimpleLayout>
);

export default LoginPage;
export {reducer, loginResponse}