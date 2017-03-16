import { connect } from 'react-redux';

// import { login } from 'api/actions';

import RegisterForm from './components/RegisterForm';

const mapDispatchToProps = {
};

const mapStateToProps = state => ({
  username: state.login.username,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
