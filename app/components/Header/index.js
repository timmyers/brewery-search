import { connect } from 'react-redux';

import Header from './components/Header';

const isLoggedIn = (store) => {
  const state = store.api.state;
  return state && state.user && state.user.loggeIn;
};

const isAdmin = (store) => {
  const state = store.api.state;
  return state && state.user && state.user.admin;
};

const mapStateToProps = state => ({
  loggedIn: isLoggedIn(state),
  admin: isAdmin(state),
});

export default connect(mapStateToProps)(Header);
