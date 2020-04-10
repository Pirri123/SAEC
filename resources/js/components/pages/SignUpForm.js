import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import axios from 'axios';

class SignUpForm extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      checkbox: false,
      classInputName: 'FormField__Input',
      classInputLastName: 'FormField__Input',
      classInputId: 'FormField__Input',
      classInputPassword: 'FormField__Input',
      classInputPasswordConfirmation: 'FormField__Input',
      errorName: '',
      errorLastName: '',
      errorId: '',
      errorPassword: '',
      errorPasswordConfirmation: '',
      errorBox: ''
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

  toggleChange = () => {
    if (this.state.checkbox === true) {
      this.setState({
        checkbox: false
      });
    } else {
      this.setState({
        checkbox: true
      });
    }
  }

  handleSubmit(event){
    event.preventDefault();

    if(this.state.checkbox === false){
      console.log("aaa");
      this.setState({ errorBox: 'ddd' });
      //this.setState({ errorBox: 'Debes aceptar los terminos y condiciones para registarte.'});
      return;
    }

    const userInfo = {
      name: firstname.value,
      lastname: lastname.value,
      id: id.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    };

    this.setState({
      classInputName: 'FormField__Input',
      classInputLastName: 'FormField__Input',
      classInputId: 'FormField__Input',
      classInputPassword: 'FormField__Input',
      classInputPasswordConfirmation: 'FormField__Input',
      errorName: '',
      errorLastName: '',
      errorId: '',
      errorPassword: '',
      errorPasswordConfirmation: '',
      errorBox: ''
    });

    axios.post('/api/register', userInfo)
      .then(res => {
        console.log("aa");
        console.log(res);
        if(res.status === 201){
          console.log(res);
        }
      })
      .catch(error => {
        for (let key in error.response.data.errors) {
          if(key === 'name'){
            this.setState({ classInputName: 'FormField__Input-Error' });
            this.setState({ errorName: error.response.data.errors.name[0] });
          }
          if(key === 'id') {
            this.setState({ classInputId: 'FormField__Input-Error' });
            this.setState({ errorId: error.response.data.errors.id[0] });
          }
          if(key === 'lastname'){
            this.setState({ classInputLastName: 'FormField__Input-Error' });
            this.setState({ errorLastName: error.response.data.errors.lastname[0] });
          }
          if(key === 'password'){
            if (error.response.data.errors.password.length >= 2) {
              this.setState({ classInputPassword: 'FormField__Input-Error' });
              this.setState({ classInputPasswordConfirmation: 'FormField__Input-Error' });
              this.setState({ errorPassword: error.response.data.errors.password[0] });
              this.setState({ errorPasswordConfirmation: error.response.data.errors.password[1] });
            }
            else {
              this.setState({ classInputPassword: 'FormField__Input-Error' });
              this.setState({ classInputPasswordConfirmation: 'FormField__Input-Error' });
              this.setState({ errorPassword: error.response.data.errors.password[0] });
              this.setState({ errorPasswordConfirmation: error.response.data.errors.password[0] });
            }
          }
        }
      });
  }


  render(){
    return(
      <div>
      <div className="PageSwitcher">
        <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Iniciar sesión</NavLink>
        <NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Registrarse</NavLink>
      </div>

      <div className="FormTitle">
        <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Iniciar sesión</NavLink>
        ó
        <NavLink to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Registrarse</NavLink>
      </div>

      <div className="FormCenter">
        <form className="FormFields" onSubmit={this.handleSubmit}>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name"> Nombre </label>
            <input type="text" id="firstname" className={this.state.classInputName} placeholder="Ingresa tu nombre" name="firstname" />
            <label className="FormField__Label-Error" htmlFor="error"> {this.state.errorName} </label>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="lastname"> Apellidos </label>
            <input type="text" id="lastname" className={this.state.classInputLastName} placeholder="Ingresa tus apellidos" name="lastname" />
            <label className="FormField__Label-Error" htmlFor="error"> {this.state.errorLastName} </label>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="id"> Matrícula </label>
            <input type="id" id="id" className={this.state.classInputId} placeholder="Ingresa tu matrícula institucional" name="id" />
            <label className="FormField__Label-Error" htmlFor="error"> {this.state.errorId} </label>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="password"> Contraseña </label>
            <input type="password" id="password" className={this.state.classInputPassword} placeholder="Ingresa tu contraseña" name="password" />
            <label className="FormField__Label-Error" htmlFor="error"> {this.state.errorPassword} </label>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="password_confirmation"> Confirmar contraseña </label>
            <input type="password" id="password_confirmation" className={this.state.classInputPasswordConfirmation} placeholder="Ingresa de nuevo tu contraseña" name="password_confirmation" />
            <label className="FormField__Label-Error" htmlFor="error"> {this.state.errorPasswordConfirmation} </label>
          </div>
          <div className="FormField">
            <label className="FormField__CheckboxLabel">
              <input className="FormField__Checkbox" defaultChecked={this.state.checkbox} onChange={this.toggleChange} type="checkbox" name="hasAgreed" /> Acepto todos los <a href="#" className="FormField__TermsLink">Terminos y condiciones</a>
            </label>
            <label className="FormField__Label-Error" htmlFor="error"> {this.state.errorBox} </label>
          </div>

          <div className="FormField">
            <button className="FormField__Button mr-20"> Registrarse </button>
            <Link to="/" className="FormField__Link"> Ya soy miembro </Link>
          </div>
        </form>
      </div>
    </div>
    );
  }
}

export default SignUpForm;
