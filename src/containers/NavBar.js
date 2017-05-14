import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { signoutUser } from '../actions';


class NavBar extends Component {

  renderUser() {
    if (!this.props.auth.authenticated) {
      return (
        <li className="navItem"><NavLink className="navLink" to="/signup"> Account </NavLink></li>
      );
    } else {
      return <li className="navItem" onClick={() => this.props.signoutUser(this.props.history)}>Log Out </li>;
    }
  }


  render() {
    return (
      <nav>
        <ul className="navigationContainer">
          <li id="mainTitle"> Andrew-Gram </li>
          <li>
            <ul className="rightNavContainer">
              <li className="navItem"><NavLink className="navLink" to="/" exact> Posts </NavLink></li>
              <li className="navItem"><NavLink className="navLink" to="/posts/new"> Add </NavLink></li>
              {this.renderUser()}
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

export default withRouter(connect(mapStateToProps, { signoutUser })(NavBar));
