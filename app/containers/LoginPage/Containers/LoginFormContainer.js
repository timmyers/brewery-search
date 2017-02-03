import { connect } from 'react-redux'
import { usernameChanged, usernameFocused, passwordChanged, passwordFocused, login } from '../Logic'

import LoginForm from '../Components/LoginForm';

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  usernameChanged,
  usernameFocused,
  passwordChanged,
  passwordFocused,
  login
}

const mapStateToProps = (state) => ({
  username: state.login.username,
  usernameError: state.login.usernameError,
  usernameTouched: state.login.usernameTouched,
  password: state.login.password,
  passwordError: state.login.passwordError,
  passwordTouched: state.login.passwordTouched
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
