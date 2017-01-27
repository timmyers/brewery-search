import { connect } from 'react-redux'
import { usernameChanged, usernameFocused, login } from '../Logic/loginReducers.js'

import LoginBox from '../Components/LoginBox';

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  usernameChanged,
  usernameFocused,
  login
}

const mapStateToProps = (state) => ({
  usernameError: state.login.usernameError,
  usernameTouched: state.login.usernameTouched
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox)
