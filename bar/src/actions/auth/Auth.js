import auth0 from 'auth0-js';
import params from './../../auth0-params.json';


export default class Auth {

  auth0 = new auth0.WebAuth({
    domain: params.domain,
    clientID: params.clientId,
    // audience: `https://${params.domain}/userinfo`,
    audience: params.apiAudience,
    redirectUri: params.callbackUrl,
    scope: params.scope,
    responseType: 'token id_token'
  });

  constructor() {
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
    this.checkSession = this.checkSession.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  signin() {
    this.auth0.authorize();
  }

  signout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  checkSession() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) {
          return reject(err)
        }

        return resolve(authResult);
      })
    });
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          return resolve();
        } else if (err) {
          console.log(err);
          return reject(err);
        }
      });
    })
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
