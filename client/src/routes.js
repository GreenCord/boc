import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}
//<Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
export const makeMainRoutes = () => {
  return (
    <Router history={history} component={App}>
      <div id="body">
        
        <Route path="/" render={(props) => {
          return (
            
              <div className="main-wrapper">
                <App auth={auth} {...props} />
                <Home auth={auth} {...props} />
              </div>
            
          )}
        } />
        
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>
        
        <footer className="page-footer">
          <div>Footer stuff here</div>
        </footer>
      </div>
    </Router>
  );
}