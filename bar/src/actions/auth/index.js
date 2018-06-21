import {
  AUTH_USER,
  AUTH_IN_PROGRESS,
  UNAUTH_USER,
  AUTH_ERROR,
  CLEARDOWN
} from './authTypes';

import Auth from './Auth';

const auth = new Auth();

export function signinUser(callback) {
  return function (dispatch) {
    dispatch({ type: AUTH_IN_PROGRESS });
      auth.signin();
  }
}

export function checkUserSession(callback) {
  return function (dispatch) {
    auth.checkSession()
      .then(() => {
        dispatch({ type: AUTH_USER });
        return callback();
      })
      .catch(err => {
        dispatch({ type: UNAUTH_USER });
        setTimeout(() => {
          const timestamp = Date.now();
          const error = `Error: ${err.error}, Error Description: ${err.errorDescription}`;
          dispatch({
            type: AUTH_ERROR,
            error,
            timestamp
          }, 1000);
        })
        return callback(err);
      });
  }
}

export function authError(error) {
  const timestamp = Date.now();
  return {
    type: AUTH_ERROR,
    error,
    timestamp
  };
}

export function signoutUser() {
  auth.signout();
  return { type: UNAUTH_USER };
}

export function cleardown() {
  return {
    type: CLEARDOWN
  };
}
