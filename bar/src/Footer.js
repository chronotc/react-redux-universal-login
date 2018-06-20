import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Footer extends Component {

  render() {
    if (this.props.authenticated) {
      return (
        <div>
          authenticated
        </div>
      );
    }

    return (
      <div>
        unauthed
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, null)(Footer);
