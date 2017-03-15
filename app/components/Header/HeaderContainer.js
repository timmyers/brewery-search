import { connect } from 'react-redux';

import Header from './components/Header';

const mapStateToProps = state => ({
  user: state.api.state.user,
});

export default connect(mapStateToProps)(Header);
