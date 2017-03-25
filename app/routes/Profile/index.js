import { connect } from 'react-redux';
import { logout } from 'api/actions';
import ProfileFormContainer from './ProfileFormContainer';

const mapStateToProps = state => ({
  user: state.api.state.user,
  numBreweries: state.api.state.breweries.length,
  numVisitedBreweries: state.api.state.breweriesVisited.visited.length,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFormContainer);
