import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../actions/auth';
import PropTypes from 'prop-types';

class Signin extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps, nextState) {
    const { error } = nextProps;
    if (error) {
      nextProps.cleardown();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.signinUser();
  }

  getSigninButton() {
    if (this.props.loading) {
      return (
        <div className="spinner spinner-md is-auth0">
          <div className="circle"></div>
        </div>
      )
    }
    return <button type="submit" className="btn btn-success btn-sm">Sign in</button>;
  }

  render() {

    return (
      <div>
        <section className="jumbotron">
          <h1>Login</h1>
          <div className="circle-logo" data-name="react">
            <div className="logo"></div>
          </div>
        </section>
        <form className="form-horizontal col-xs-10 col-xs-offset-1" onSubmit={this.onSubmit.bind(this)}>
          <div className="form-group">
            <span className="col-xs-3"></span>
            <div className="col-sm-6">
              {this.getSigninButton()}
            </div>
          </div>
       </form>
     </div>
    );
  }
}

function mapStateToProps(state) {
  const { error, timestamp, forgotMsg, loading } = state.auth;
  return {
    error,
    timestamp,
    forgotMsg,
    loading
  };
}

export default connect(mapStateToProps, actions)(Signin);