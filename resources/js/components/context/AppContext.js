import React, { Component } from 'react';
import axios from 'axios';

export const MyContext = React.createContext();

export class MyProvider extends Component {
  constructor(props){
    super(props);
    this.handleLocalUser = this.handleLocalUser.bind(this);
    this.handleLocalToken = this.handleLocalToken.bind(this);
    this.handleLocalLogged = this.handleLocalLogged.bind(this);
    this.handleLocalRole = this.handleLocalRole.bind(this);
  }

  state = {
      user: {},
      token: '',
      isLoggedIn: '',
      role: ''
    }

  componentDidMount(){
    this.handleLocalUser();
    this.handleLocalToken();
    this.handleLocalLogged();
  }

  handleLocalUser() {
    if (localStorage.user) {
      this.state.user = JSON.parse(localStorage.getItem('user'));
    }else if (Object.keys(this.state.user).length > 0) {
      localStorage.setItem('user', JSON.stringify(this.state.user));
    }
  }

  handleLocalRole() {
    if (localStorage.role) {
      this.state.role = localStorage.getItem('role');
    }else if (this.state.role !== '') {
      localStorage.setItem('role', this.state.role);
    }
  }

  handleLocalToken() {
    if (localStorage.token) {
      this.state.token = localStorage.getItem('token');
    }else if (this.state.token !== '') {
      localStorage.setItem('token', this.state.token);
    }
  }

  handleLocalLogged() {
    if (localStorage.isLoggedIn) {
      this.state.isLoggedIn = localStorage.getItem('isLoggedIn');
    }else if (this.state.isLoggedIn !== '') {
      localStorage.setItem('isLoggedIn', this.state.isLoggedIn);
    }
  }

  handleUserContextChange = user => this.setState({ user: user })

  handleTokenContextChange = token => this.setState({ token: token })

  handleLoggedInContextChange = logged => this.setState({ isLoggedIn: logged })

  handleRoleContextChange = role => this.setState({ role: role })

  render() {
    this.handleLocalUser();
    this.handleLocalLogged();
    this.handleLocalToken();
    this.handleLocalRole();
    return (
      <MyContext.Provider value={{
          ...this.state,
          handleUserContextChange: this.handleUserContextChange,
          handleTokenContextChange: this.handleTokenContextChange,
          handleLoggedInContextChange: this.handleLoggedInContextChange,
          handleRoleContextChange: this.handleRoleContextChange
        }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}
