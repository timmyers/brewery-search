import { connect } from 'react-redux';

import Header from './components/Header';

const getLoggedIn = (store) => {
  const state = store.api.state;
  return state && state.user && state.user.loggeIn;
};

const mapStateToProps = state => ({
  loggedIn: getLoggedIn(state),
});

export default connect(mapStateToProps)(Header);
