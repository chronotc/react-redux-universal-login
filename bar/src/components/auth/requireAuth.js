import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

export default function(ComposedComponent) {

  class Authentication extends Component {

    componentWillMount() {
      this.props.checkUserSession((err, result) => {
        if (err) {
          return this.props.history.push('/');
        }
      });
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push("/");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps, actions)(Authentication);
}
