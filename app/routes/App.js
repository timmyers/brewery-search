import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';

import VerticalFlex from 'components/VerticalFlex';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { orange700, orange900, brown600 } from 'material-ui/styles/colors';

import Home from 'routes/Home';
import Login from 'routes/Login';
import Profile from 'routes/Profile';
import Register from 'routes/Register';

import { history } from '../store/createStore';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orange700,
    primary2Color: orange900,
    accent1Color: brown600,
  },
});

const App = (props) => {
  console.log(props);
  const { store } = props;

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <VerticalFlex full>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/register" component={Register} />
          </VerticalFlex>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export { history };
export default App;
