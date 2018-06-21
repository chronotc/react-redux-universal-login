import React, { Component } from 'react';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from '../../actions/auth';
import * as EmailValidator from 'email-validator';
import PropTypes from 'prop-types';

class Signin extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.signoutUser();
  }

  componentWillUpdate(nextProps, nextState) {
    const { error } = nextProps;
    if (error) {
      this.container.error(`${error}`, "Signin Failed", {
        timeOut: 3000, extendedTimeOut: 4000
      });
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
    return <button type="submit" className="btn btn-success btn-sm">Submit</button>;
  }

  getForgotButton() {
    if (!this.props.loading) {
      return <Link to="/forgot" className="btn btn-primary btn-sm">Forgot Password</Link>;
    }
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
              {this.getForgotButton()}
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