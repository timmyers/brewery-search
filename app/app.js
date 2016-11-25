import React, { Component, PropTypes } from 'react';
import Router from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import Link from 'react-router/Link'

import VerticalFlex from 'components/VerticalFlex';

import HomePage from 'containers/HomePage';
import AboutPage from 'containers/AboutPage';

export default class App extends Component {
	static propTypes = {
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
    return (
  		<Router>
	  		<VerticalFlex>
	    		<Match exactly pattern="/" component={HomePage} />
	    		<Match pattern="/about" component={AboutPage} />
    		</VerticalFlex>
  		</Router>
    );
	}
}
