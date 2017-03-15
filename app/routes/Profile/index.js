import { connect } from 'react-redux';
import { logout } from 'api/actions';
import ProfileFormContainer from './ProfileFormContainer';

const mapStateToProps = state => ({
  user: state.api.state.user,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFormContainer);
