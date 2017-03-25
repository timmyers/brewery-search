import { connect } from 'react-redux';

import Header from './components/Header';

const mapStateToProps = state => ({
  loggedIn: state.api.state.user.loggedIn,
});

export default connect(mapStateToProps)(Header);
