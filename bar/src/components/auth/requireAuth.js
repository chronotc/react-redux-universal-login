import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';

export default function(ComposedComponent) {

  class Authentication extends Component {
    constructor() {
      super();
      this.state = {
        loading: true
      }
    }

    componentWillMount() {
      this.props.checkUserSession((err, result) => {
        this.setState({ loading: false })
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
      if (this.state.loading) {
        return (
          <div>
            Verifying...
          </div>
        );
      }

      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps, actions)(Authentication);
}
