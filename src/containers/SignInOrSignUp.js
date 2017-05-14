import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signinUser, signupUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      isSigningIn: true,
      isSigningUp: false,
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.renderSign = this.renderSign.bind(this);
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  onEmailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  renderSign() {
    if (this.state.isSigningIn) {
      return (
        <form className="signInItem">
          <input onChange={this.onEmailChange} type="text" placeholder="Email" value={this.state.email} />
          <input onChange={this.onPasswordChange} type="text" placeholder="Password" value={this.state.password} />
          <div>
            <button type="button" id="enterButton" className="pink" onClick={() => this.props.signinUser(this.state, this.props.history)}>Enter </button>
          </div>
        </form>
      );
    } else {
      return (
        <form className="signInItem">
          <input onChange={this.onUsernameChange} type="text" placeholder="Username" value={this.state.username} />
          <input onChange={this.onEmailChange} type="text" placeholder="Email" value={this.state.email} />
          <input onChange={this.onPasswordChange} type="text" placeholder="Password" value={this.state.password} />
          <div>
            <button type="button" id="enterButton" className="pink" onClick={() => this.props.signupUser(this.state, this.props.history)}>Enter </button>
          </div>
        </form>
      );
    }
  }


  render() {
    return (
      <div className="signInContainer">
        <div className="signInSwitch">
          <button type="button" id="enterButton" onClick={() => this.setState({ isSigningUp: true, isSigningIn: false })}>Sign Up </button>
          <button autoFocus type="button" id="enterButton" onClick={() => this.setState({ isSigningUp: false, isSigningIn: true })}>Sign In </button>
        </div>
        {this.renderSign()}
      </div>
    );
  }

}

export default withRouter(connect(null, { signinUser, signupUser })(SignIn));
