import React, { Component } from 'react';
import './Login.scss';
import LoginForm from './Login';
import asset1 from './images/Asset1.png';
import asset2 from './images/Asset2.png';

class Login extends Component {
  render() {
    return (
      <main className="login">
        <img className="asset2" src={asset2} alt={''} /> <LoginForm />
        <img className="asset1" src={asset1} alt={''} />
      </main>
    );
  }
}

export default Login;
