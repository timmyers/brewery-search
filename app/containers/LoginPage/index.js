import React from 'react';

import SimpleLayout from 'layouts/SimpleLayout';

import LoginForm from './Containers/LoginFormContainer';

import {reducer} from './Logic/loginReducers';

const LoginPage = () => (
	<SimpleLayout>
		<LoginForm>
		</LoginForm>
  </SimpleLayout>
);

export default LoginPage;
export {reducer}