import React, { Component }from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';
import {Switch} from 'react-router';
import './../../styles/Dash.css';
import { MyProvider , MyContext } from './context/AppContext';
import history from './history';
import First from './mainViews/FirstView';
import Second from './mainViews/SecondView';


class Main extends Component {

  render() {
    return (

      <Router>

        <div>

            <Route history={history} exact path="/" render={(props) =>
                <First {...props}
                  user={this.props.user}
                  token={this.props.token}
                  isLoggedIn={this.props.isLoggedIn}
                  handleUserContextChange={this.props.handleUserContextChange}
                  handleTokenContextChange={this.props.handleTokenContextChange}
                  handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                  role={this.props.role}
                  handleRoleContextChange={this.props.handleRoleContextChange}
                />
            } />

            <Route exact={"true"} path="/sign-up" render={(props) =>
                <First {...props}
                  user={this.props.user}
                  token={this.props.token}
                  isLoggedIn={this.props.isLoggedIn}
                  handleUserContextChange={this.props.handleUserContextChange}
                  handleTokenContextChange={this.props.handleTokenContextChange}
                  handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                  role={this.props.role}
                  handleRoleContextChange={this.props.handleRoleContextChange}
                />
            } >
            </Route>

            <Route exact={"true"} path="/forgot-password" render={(props) =>
                <First {...props}
                  user={this.props.user}
                  token={this.props.token}
                  isLoggedIn={this.props.isLoggedIn}
                  handleUserContextChange={this.props.handleUserContextChange}
                  handleTokenContextChange={this.props.handleTokenContextChange}
                  handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                  role={this.props.role}
                  handleRoleContextChange={this.props.handleRoleContextChange}
                />
            } >
            </Route>

          <Route history={history} exact path="/dashboard" render={(props) =>
                <Second {...props}
                  user={this.props.user}
                  token={this.props.token}
                  isLoggedIn={this.props.isLoggedIn}
                  handleUserContextChange={this.props.handleUserContextChange}
                  handleTokenContextChange={this.props.handleTokenContextChange}
                  handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                  role={this.props.role}
                  handleRoleContextChange={this.props.handleRoleContextChange}
                />
            } />

          <Route history={history} exact path="/assignment" render={(props) =>
              <Second {...props}
                user={this.props.user}
                token={this.props.token}
                isLoggedIn={this.props.isLoggedIn}
                handleUserContextChange={this.props.handleUserContextChange}
                handleTokenContextChange={this.props.handleTokenContextChange}
                handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                role={this.props.role}
                handleRoleContextChange={this.props.handleRoleContextChange}
              />
            } />

            <Route history={history} exact path="/perfil" render={(props) =>
                <Second {...props}
                  user={this.props.user}
                  token={this.props.token}
                  isLoggedIn={this.props.isLoggedIn}
                  handleUserContextChange={this.props.handleUserContextChange}
                  handleTokenContextChange={this.props.handleTokenContextChange}
                  handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                  role={this.props.role}
                  handleRoleContextChange={this.props.handleRoleContextChange}
                />
              } />

                <Route history={history} exact path="/createRubric" render={(props) =>
                <Second {...props}
                  user={this.props.user}
                  token={this.props.token}
                  isLoggedIn={this.props.isLoggedIn}
                  handleUserContextChange={this.props.handleUserContextChange}
                  handleTokenContextChange={this.props.handleTokenContextChange}
                  handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                  role={this.props.role}
                  handleRoleContextChange={this.props.handleRoleContextChange}
                  />
              } />

          <Route history={history} exact path="/createAssignment" render={(props) =>
                <Second {...props}
                    user={this.props.user}
                    token={this.props.token}
                    isLoggedIn={this.props.isLoggedIn}
                    handleUserContextChange={this.props.handleUserContextChange}
                    handleTokenContextChange={this.props.handleTokenContextChange}
                    handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                    role={this.props.role}
                    handleRoleContextChange={this.props.handleRoleContextChange}
                  />
              } />

            <Route history={history} exact path="/groups" render={(props) =>
                <Second {...props}
                    user={this.props.user}
                    token={this.props.token}
                    isLoggedIn={this.props.isLoggedIn}
                    handleUserContextChange={this.props.handleUserContextChange}
                    handleTokenContextChange={this.props.handleTokenContextChange}
                    handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                    role={this.props.role}
                    handleRoleContextChange={this.props.handleRoleContextChange}
                    />
                } />

          <Route history={history} exact path="/createGroup" render={(props) =>
              <Second {...props}
                user={this.props.user}
                token={this.props.token}
                isLoggedIn={this.props.isLoggedIn}
                handleUserContextChange={this.props.handleUserContextChange}
                handleTokenContextChange={this.props.handleTokenContextChange}
                handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                role={this.props.role}
                handleRoleContextChange={this.props.handleRoleContextChange}
                />
            } />

          <Route history={history} exact path="/forms" render={(props) =>
                <Second {...props}
                    user={this.props.user}
                    token={this.props.token}
                    isLoggedIn={this.props.isLoggedIn}
                    handleUserContextChange={this.props.handleUserContextChange}
                    handleTokenContextChange={this.props.handleTokenContextChange}
                    handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                    role={this.props.role}
                    handleRoleContextChange={this.props.handleRoleContextChange}
                    />
                } />

            <Route history={history} exact path="/createForm" render={(props) =>
              <Second {...props}
                user={this.props.user}
                token={this.props.token}
                isLoggedIn={this.props.isLoggedIn}
                handleUserContextChange={this.props.handleUserContextChange}
                handleTokenContextChange={this.props.handleTokenContextChange}
                handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                role={this.props.role}
                handleRoleContextChange={this.props.handleRoleContextChange}
                />
            } />

          <Route history={history} exact path="/group" render={(props) =>
            <Second {...props}
              user={this.props.user}
              token={this.props.token}
              isLoggedIn={this.props.isLoggedIn}
              handleUserContextChange={this.props.handleUserContextChange}
              handleTokenContextChange={this.props.handleTokenContextChange}
              handleLoggedInContextChange={this.props.handleLoggedInContextChange}
              role={this.props.role}
              handleRoleContextChange={this.props.handleRoleContextChange}
              />
          } />

        <Route history={history} exact path="/form" render={(props) =>
            <Second {...props}
              user={this.props.user}
              token={this.props.token}
              isLoggedIn={this.props.isLoggedIn}
              handleUserContextChange={this.props.handleUserContextChange}
              handleTokenContextChange={this.props.handleTokenContextChange}
              handleLoggedInContextChange={this.props.handleLoggedInContextChange}
              role={this.props.role}
              handleRoleContextChange={this.props.handleRoleContextChange}
              />
          } />

        <Route history={history} exact path="/editAssignment" render={(props) =>
              <Second {...props}
                user={this.props.user}
                token={this.props.token}
                isLoggedIn={this.props.isLoggedIn}
                handleUserContextChange={this.props.handleUserContextChange}
                handleTokenContextChange={this.props.handleTokenContextChange}
                handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                role={this.props.role}
                handleRoleContextChange={this.props.handleRoleContextChange}
                />
            } />

        <Route history={history} exact path="/editGroup" render={(props) =>
            <Second {...props}
              user={this.props.user}
              token={this.props.token}
              isLoggedIn={this.props.isLoggedIn}
              handleUserContextChange={this.props.handleUserContextChange}
              handleTokenContextChange={this.props.handleTokenContextChange}
              handleLoggedInContextChange={this.props.handleLoggedInContextChange}
              role={this.props.role}
              handleRoleContextChange={this.props.handleRoleContextChange}
              />
          } />

        <Route history={history} exact path="/editForm" render={(props) =>
                <Second {...props}
                  user={this.props.user}
                  token={this.props.token}
                  isLoggedIn={this.props.isLoggedIn}
                  handleUserContextChange={this.props.handleUserContextChange}
                  handleTokenContextChange={this.props.handleTokenContextChange}
                  handleLoggedInContextChange={this.props.handleLoggedInContextChange}
                  role={this.props.role}
                  handleRoleContextChange={this.props.handleRoleContextChange}
                  />
              } />

        </div>

      </Router>

    );
  }
}

export default Main;

/* The if statement is required so as to Render the component on pages that have a div with an ID of "root";
*/

if (document.getElementById('root')) {
    ReactDOM.render(
    <MyProvider>
      <MyContext.Consumer>
        {({user, token, isLoggedIn, role, handleUserContextChange, handleTokenContextChange, handleLoggedInContextChange,  handleRoleContextChange}) =>  (
          <Main
            user={user}
            token={token}
            isLoggedIn={isLoggedIn}
            role={role}
            handleRoleContextChange={handleRoleContextChange}
            handleUserContextChange={handleUserContextChange}
            handleTokenContextChange={handleTokenContextChange}
            handleLoggedInContextChange={handleLoggedInContextChange}
          />
        )}
      </MyContext.Consumer>
    </MyProvider>,
  document.getElementById('root'));
}
