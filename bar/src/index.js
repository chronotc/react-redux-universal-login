import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from "./reducers";

import App from './App';
import Signin from './components/auth/Signin';
import Home from './components/home/Home';
import Callback from './components/callback/Callback';
import RequireAuth from './components/auth/requireAuth';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(reduxThunk)
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path='/' component={Signin}/>
          <Route exact path='/callback' component={Callback}/>
          <Route exact path='/home' component={RequireAuth(Home)}/>
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
