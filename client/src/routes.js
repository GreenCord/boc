import React from 'react';
import { Route, Router } from 'react-router-dom';

import App from './App';
import Home from './Home/Home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import ProfileContainer from './Profile/ProfileContainer';
import CreateClub from './Club/CreateClub';
import ShowClub from './Club/ShowClub';
import ClubContainer from './Club/ClubContainer';

// import { withUser, update } from './utils/withUser';
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
        <div className="main-wrapper">

          <Route exact path="/" render={(props) => {
          
            return (
              <div>
                <App auth={auth} {...props} />
                <Home auth={auth} {...props} />
              </div>
            )}
          
          }/>

          <Route path="/profile" render={(props) =>{
            return (

              <div>
                <App auth={auth} {...props} />
                <ProfileContainer auth={auth} {...props} />
              </div>

            )}
          }/> 

          <Route path="/newclub" render={(props) =>{
            return (

              <div>
                <App auth={auth} {...props} />
                <CreateClub auth={auth} {...props} />
              </div>

            )}
          }/>

          <Route exact path="/clubs" render={(props) =>{
            return (
              <div>
                <App auth={auth} {...props} />
                <ShowClub auth={auth} {...props} />
              </div>
            )}
          }/>

          <Route exact path="/clubs/:id" render={(props) =>{
            return (
              <div>
                <App auth={auth} {...props} />
                <ClubContainer auth={auth} {...props} />
              </div>
            )}
          }/>
          
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>

        </div>
        
        <footer className="page-footer">
          <div>Footer stuff here</div>
        </footer>
      </div>
    </Router>
  );
}