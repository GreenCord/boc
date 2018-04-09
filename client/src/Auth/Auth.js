import history from '../history';
import auth0 from 'auth0-js';
import API from '../utils/API';

// import update from '../utils/withUser';

const DOMAIN = process.env.REACT_APP_AUTH_DOMAIN;
const CLIENTID = process.env.REACT_APP_AUTH_CLIENTID;
const REDIRECTURI = process.env.REACT_APP_AUTH_REDIRECTURI;
const AUDIENCE = process.env.REACT_APP_AUTH_AUDIENCE;

console.log('Test env',DOMAIN);

export default class Auth {
	auth0 = new auth0.WebAuth({
		domain: DOMAIN,
		clientID: CLIENTID,
    redirectUri: REDIRECTURI,
    audience: AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid profile'
	});

	login() {
		this.auth0.authorize();
	}

	constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  userProfile;

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        // console.log('Auth.js for withUser, authResult',authResult);
        this.setSession(authResult);
        history.replace('/profile');
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // let data = {
    //   auth0_id: authResult.idTokenPayload.sub,
    //   username: authResult.idTokenPayload.name
    // }
    // update(data);
    // navigate to the home route
    history.replace('/profile');
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found.');
    }
    return accessToken;
  }

  getProfile(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      
      if (profile) {
        // console.log('AUTH0 - profile found - ',profile);
        this.userProfile = profile;

        // check db for profile.sub
        if (!this.userProfile.checked) {
          API.findUser(encodeURI(profile.sub))
          .then(res=>{
            // if found, update last login
            if (res.data) {
              console.log('RA|/auth/auth.js - user found, do stuff', res.data);
              this.userProfile.checked = true;
              // stuff to do:
              // update lastlogin_at
              let updated_user = res.data;
              let datenow = new Date(Date.now());
              updated_user.lastlogin_at = datenow.toISOString();
              API.updateUser(updated_user);
            } else {
              // if not found, create user
              console.log('RA|/auth/auth.js - no user found, create new user');
              const data = {
                auth0_id: profile.sub,
                username: profile.name
              }
              API.createUser(data)
              .then(res=>{
                console.log('RA|/auth/auth.js - user created:',res);
              })
              .catch(err=>console.log(err));
            } // end else if

          })
          .catch(err=>console.log(err));
        } else {
          console.log('User was already checked.');
        }// end if userProfile checked

      } // end if profile
      cb(err, profile);
    });
  }

}