import { connect } from 'react-redux';

import SearchResult from './SearchResult';
import { imageDrop } from '../../logic';

const mapStateToProps = state => ({
  result: state.addBrewery.searchResult,
  imageURL: state.addBrewery.imageURL,
});

const dispatchProps = {
  imageDrop,
};

export default connect(mapStateToProps, dispatchProps)(SearchResult);
