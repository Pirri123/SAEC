import React from 'react';
import Dropdown, { DropdownTrigger, DropdownContent} from 'react-simple-dropdown';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import axios from 'axios';

class Menu extends React.Component {

constructor(props){
  super(props);
  this.handleLogOut = this.handleLogOut.bind(this);
}

handleLogOut(){
  axios({
    url: '/api/logout',
    method: 'get',
    headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.token}`}
  }).then(res => {
    if(res.data.success === true){
      this.props.handleUserContextChange({});
      this.props.handleTokenContextChange('');
      this.props.handleLoggedInContextChange('');
      this.props.handleRoleContextChange('');
      window.localStorage.clear();
      window.location.href = "/";
    }
  })
  .catch(error => {

  });
}



render() {
    return (
        <Dropdown>
            <DropdownTrigger>Opciones</DropdownTrigger>
            <DropdownContent>
                <ul>
                    <li>
                        <NavLink to={{pathname:"/perfil", state:this.props.user }} className="Navbar__Link"> Perfil </NavLink>
                    </li>
                    <li onClick={this.handleLogOut}>
                        <NavLink to="/">Salir</NavLink>
                    </li>
                </ul>
            </DropdownContent>
        </Dropdown>
    );
}
}

export default Menu;
