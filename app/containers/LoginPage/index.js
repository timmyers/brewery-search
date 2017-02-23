import React from 'react';

import SimpleLayout from 'layouts/SimpleLayout';

import LoginForm from './Containers/LoginFormContainer';

import {reducer} from './Logic';

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
export {reducer}