import { connect } from 'react-redux';

import SearchForm from './SearchForm';
import { searchResult } from '../../logic';

const dispatchProps = {
  searchResult,
};

export default connect(null, dispatchProps)(SearchForm);
