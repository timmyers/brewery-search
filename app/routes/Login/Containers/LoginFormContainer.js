import { connect } from 'react-redux';

import { login } from 'api/actions';

import { usernameChanged, usernameFocused, passwordChanged, passwordFocused, register } from '../logic';
import LoginForm from '../components/LoginForm';

const mapDispatchToProps = {
  usernameChanged,
  usernameFocused,
  passwordChanged,
  passwordFocused,
  login,
  register,
};

const mapStateToProps = state => ({
  username: state.login.username,
  usernameError: state.login.usernameError,
  usernameTouched: state.login.usernameTouched,
  password: state.login.password,
  passwordError: state.login.passwordError,
  passwordTouched: state.login.passwordTouched,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
