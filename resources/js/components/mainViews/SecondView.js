import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import Dashboard from './../pages/inside/dashboard/Dashboard';
import Groups from './../pages/inside/groups/Groups';
import Forms from './../pages/inside/forms/Forms';
import AssignmentInfo from './../pages/inside/assignmentInfo/AssignmentInfo';

///home/pirri/Documents/escuela/SAEC/DEPA-master/resources/js/components/pages/inside/assignmentInfo/AssignmentInfo.jsx
import GroupInfo from './../pages/inside/groupInfo/GroupInfo';
import FormInfo from './../pages/inside/formInfo/FormInfo';
import Perfil from './../pages/inside/profile/Perfil';
import AddAssignment from './../pages/inside/addAssignment/AddAssignment';
import AddGroup from './../pages/inside/addGroup/AddGroup';
import AddForm from './../pages/inside/addForm/AddForm';
import EditAssignment from './../pages/inside/editAssignment/EditAssignment';
import EditGroup from './../pages/inside/editGroup/EditGroup';
import EditForm from './../pages/inside/editForm/EditForm';
import './../../../styles/Dash.css';
import Menu from './../component/menu/Menu';
import axios from 'axios';

class Second extends Component{
  state = {
    role : this.props.role
  }


  componentDidMount() {
    // Llamada a la API...
        if (this.props.role === '') {
          axios({
            url: '/graphql',
            method: 'post',
            headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.token}`},
            data: {
              query: `
              query {
                me{
                  id
                  roles{
                    name
                  }
                }
              }
              `
            }
          }).then((result) => {
            this.props.handleRoleContextChange(result.data.data.me.roles[0].name);
          });

        }

    }


  render() {

    const Nav = (
      <div className="Navbar">
        <div className="Navbar__Left">
          <ul className="Navbar__List">
            <li> <NavLink to="/dashboard" className="Navbar__Link"> Logo de SAEC </NavLink></li>
          </ul>
        </div>
        <div className="Navbar__Right" align="right">
          <ul className="Navbar__List">
            <li> <NavLink to="/dashboard" className="Navbar__Link"> Actividades </NavLink></li>
            {(this.props.role !== 'student') ? <li> <NavLink to="/groups" className="Navbar__Link"> Grupos </NavLink></li> : <li /> }
            {(this.props.role !== 'student' && this.props.role !== 'professor') ? <li> <NavLink to="/forms" className="Navbar__Link"> Forms </NavLink></li> : <li />}
            <Menu
              user={this.props.user}
              token={this.props.token}
              handleUserContextChange={this.props.handleUserContextChange}
              handleTokenContextChange={this.props.handleTokenContextChange}
              handleLoggedInContextChange={this.props.handleLoggedInContextChange}
              role={this.props.role}
              handleRoleContextChange={this.props.handleRoleContextChange}
            />
          </ul>
        </div>
      </div>
    );

    return (

        <div className="Dash">

          {Nav}

          <Route exact={"true"} path="/dashboard" render={(props) =>
              <Dashboard {...props}
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

          <Route exact={"true"} path="/assignment" render={(props) =>
              <AssignmentInfo {...props}
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

          <Route exact={"true"} path="/perfil" render={(props) =>
              <Perfil {...props}
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

          <Route exact={"true"} path="/createAssignment" render={(props) =>
              <AddAssignment {...props}
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

          <Route exact={"true"} path="/groups" render={(props) =>
              <Groups {...props}
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

          <Route exact={"true"} path="/createGroup" render={(props) =>
              <AddGroup {...props}
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

          <Route exact={"true"} path="/forms" render={(props) =>
              <Forms {...props}
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

          <Route exact={"true"} path="/createForm" render={(props) =>
              <AddForm {...props}
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

          <Route exact={"true"} path="/group" render={(props) =>
              <GroupInfo {...props}
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

          <Route exact={"true"} path="/form" render={(props) =>
              <FormInfo {...props}
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

          <Route exact={"true"} path="/editAssignment" render={(props) =>
              <EditAssignment {...props}
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

          <Route exact={"true"} path="/editGroup" render={(props) =>
              <EditGroup {...props}
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

          <Route exact={"true"} path="/editForm" render={(props) =>
              <EditForm {...props}
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

        </div>

    );
  }
}

export default Second;
