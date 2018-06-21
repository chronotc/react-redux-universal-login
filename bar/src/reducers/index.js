import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './authReducer';
import callback from './callbackReducer';
import home from './homeReducer';

const rootReducer = combineReducers({
  form,
  auth,
  callback,
  home
});

export default rootReducer;
