import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux';
import Router from 'react-router-addons-controlled/ControlledBrowserRouter'
import createBrowserHistory from 'history/createBrowserHistory'
import Match from 'react-router/Match'
import Link from 'react-router/Link'
import SimpleWebsocket from 'simple-websocket'

import VerticalFlex from 'components/VerticalFlex';

import HomePage from 'containers/HomePage';
import AboutPage from 'containers/AboutPage';
import LoginPage from 'containers/LoginPage';

import {NAVIGATE} from 'store/location';

var loc = window.location, new_uri;
if (loc.protocol === "https:") {
    new_uri = "wss:";
} else {
    new_uri = "ws:";
}
new_uri += "//" + loc.host;
new_uri += loc.pathname + "api";
console.log(new_uri);
var ws = new SimpleWebsocket(new_uri)
ws.on('connect', function () {
  // socket is connected!
 ws.send('sup!')
})
ws.on('data', function (data) {
  console.log('got message: ' + data)
})

const history = createBrowserHistory();
console.log(history);

const App = connect((state) => {
  return {
    location: state.router.location,
    action: state.router.action
  }
})(class App extends Component {
	static propTypes = {
    location: PropTypes.object,
    action: PropTypes.string,
    dispatch: PropTypes.func,
    store  : PropTypes.object.isRequired
  }

	render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
	  		<Router history={history}
			        location={this.props.location}
			        action={this.props.action}
			        onChange={(location, action) => {
			          // you must always dispatch a `SYNC` action,
			          // because, guess what? you can't actual control the browser history!
			          // anyway, use your current action not "SYNC"
			          if (action === 'SYNC') {
			            this.props.dispatch({
			              type: NAVIGATE,
			              location,
			              action: this.props.action
			            })
			          } else if (!window.block) {
			            // if you want to block transitions go into the console and type in
			            // `window.block = true` and transitions won't happen anymore
			            this.props.dispatch({
			              type: NAVIGATE,
			              location,
			              action
			            })
			          } else {
			            console.log('blocked!') // eslint-disable-line
			          }
			        }}
	  		>
		  		<VerticalFlex>
		    		<Match exactly pattern="/" component={HomePage} />
		    		<Match pattern="/about" component={AboutPage} />
		    		<Match pattern="/login" component={LoginPage} />
	    		</VerticalFlex>
	  		</Router>
  		</Provider>
    );
	}
})

export {history}
export default App