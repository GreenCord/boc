import React, { Component } from "react";
import { Navbar, Button } from 'react-bootstrap';
import "./App.css";

// test
// import Auth from './Auth/Auth.js';

// const auth = new Auth();

// auth.login();

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar className="navbar-default">
          <Navbar.Header>
            <button
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#boc_menu"
              aria-expanded="false"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Navbar.Brand>
              <a href="/">Base of Clubs</a>
            </Navbar.Brand>
          </Navbar.Header>
          <div className="collapse navbar-collapse pull-right" id="boc_menu">
            <ul className="nav navbar-nav">
              {
                !isAuthenticated() && (
                    <li>
                      <a onClick={this.goTo.bind(this, 'home')}>Home</a>
                    </li>
                    )
              }
              {
                !isAuthenticated() && (
                    <li>
                      <a onClick={this.login.bind(this)}>
                        Log In / Register
                      </a>
                    </li>
                  )
              }
              {
                isAuthenticated() && (
                    <li>
                      <a onClick={this.goTo.bind(this, 'home')}>Profile</a>
                    </li>
                  )
              }
              {
                isAuthenticated() && (
                    <li>
                      <a onClick={this.logout.bind(this)}>
                      Log Out
                      </a>
                    </li>
                  )
              }
            </ul>
          </div>
        </Navbar>
        <div className="row"><div className="col-xs-12"></div></div>
      </div>
    );
  }
}

export default App;
