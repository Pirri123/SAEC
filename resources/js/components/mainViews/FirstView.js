import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import SignUpForm from './../pages/SignUpForm';
import SignInForm from './../pages/SignInForm';
import RecoverPassword from './../pages/RecoverPassword';
import './../../../styles/App.css';

/* An example React component */
class First extends Component {

  render() {
    return (

      <div className="App">
        <div className="App__Aside"></div>
        <div className="App__Form">

          <Route exact={"true"} path="/sign-up" render={(props) =>
              <SignUpForm {...props}
                user={this.props.user}
                token={this.props.token}
                isLoggedIn={this.props.isLoggedIn}
                handleUserContextChange={this.props.handleUserContextChange}
                handleTokenContextChange={this.props.handleTokenContextChange}
                handleLoggedInContextChange={this.props.handleLoggedInContextChange}
              />
          } >
          </Route>

            <Route exact={"true"} path="/" render={(props) =>
                <SignInForm {...props}
                  user={this.props.user}
                  token={this.props.token}
                  isLoggedIn={this.props.isLoggedIn}
                  handleUserContextChange={this.props.handleUserContextChange}
                  handleTokenContextChange={this.props.handleTokenContextChange}
                  handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                />
            } >
            </Route>

            <Route exact={"true"} path="/forgot-password" render={(props) =>
                <RecoverPassword {...props}
                  user={this.props.user}
                  token={this.props.token}
                  isLoggedIn={this.props.isLoggedIn}
                  handleUserContextChange={this.props.handleUserContextChange}
                  handleTokenContextChange={this.props.handleTokenContextChange}
                  handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                />
            } >
            </Route>

        </div>
      </div>

    );
  }
}

export default First;
