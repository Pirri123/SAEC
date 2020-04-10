import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import axios from 'axios';

class RecoverPassword extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      classInputEmail: 'FormField__Input',
      errorEmail: ''
    }
  }

  componentDidMount(){
    if (this.props.isLoggedIn === 'true') {
      let path = `/dashboard`;
      this.props.history.push({
        pathname: path,
      });
    }
  }

  handleSubmit(event){
  event.preventDefault();

  const userInfo = {
    email: email.value
  };

  this.setState({
    classInputEmail: 'FormField__Input',
    errorEmail: ''
  });

    axios.post('/api/password/create', userInfo)
      .then(res => {
        if(res.status === 204){

        }
      })
      .catch(error => {
        if (error.response.status === 422) {
          this.setState({ classInputEmail: 'FormField__Input-Error' });
          this.setState({ errorEmail: error.response.data.errors.email[0] });
        }
      });
    }

  render(){
    return(
      <div>
      <div className="PageSwitcher">
        <NavLink exact to="/forgot-password" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Recuperar contraseña</NavLink>
      </div>

      <div className="FormTitle">
        <NavLink to="/forgot-password" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Recuperar contraseña</NavLink>
      </div>

      <div className="FormCenter">
        <form className="FormFields" onSubmit={this.handleSubmit} >
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name"> E-mail </label>
            <input type="email" id="email" className={this.state.classInputEmail} placeholder="Ingresa tu e-mail institucional" name="email" />
            <label className="FormField__Label-Error" htmlFor="error"> {this.state.errorEmail} </label>
          </div>
          <div className="FormField">
            <button className="FormField__Button mr-20"> Enviar correo </button>
            <Link to="/" className="FormField__Link"> Pagina de inicio </Link>
          </div>
        </form>
      </div>
    </div>
    );
  }
}

export default RecoverPassword;
