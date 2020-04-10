import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink, Redirect} from 'react-router-dom';
import axios from 'axios';
import history from '../history';

class SignInForm extends Component {

  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error : '',
      classInputEmail: 'FormField__Input',
      classInputPassword: 'FormField__Input',
      errorEmail: '',
      errorPassword: ''
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


  transition() {
    let tl = new TimelineMax();

    tl.to(CSSRulePlugin.getRule('body:before'), 0.3, {cssRule: {top: '50%' }, ease: Power2.easeOut}, 'close')
    .to(CSSRulePlugin.getRule('body:after'), 0.3, {cssRule: {bottom: '50%' }, ease: Power2.easeOut}, 'close')
    .to($('.loader'), 0.2, {opacity: 1})
    .to(CSSRulePlugin.getRule('body:before'), 0.2, {cssRule: {top: '0%' }, ease: Power2.easeOut}, '+=1.5', 'open')
    .to(CSSRulePlugin.getRule('body:after'), 0.2, {cssRule: {bottom: '0%' }, ease: Power2.easeOut}, '-=0.2', 'open')
    .to($('.loader'), 0.2, {opacity: 0}, '-=0.2');
  }

  handleSubmit(event) {
    event.preventDefault();

      const userInfo = {
        email: email.value,
        password: password.value
      };

      this.setState({
        classInputEmail: 'FormField__Input',
        classInputPassword: 'FormField__Input',
        errorEmail: '',
        errorPassword: '',
        error: ''
      });

      axios.post('/api/login', userInfo)
        .then(res => {
          if(res.status === 200){
            const { user, token } = res.data;
            this.props.handleUserContextChange(user);
            this.props.handleTokenContextChange(token);
            this.props.handleLoggedInContextChange('true');
            this.transition();
            let path = `/dashboard`;
            this.props.history.push(path);
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            this.setState({
              error: 'Usuario o contraseña incorrecta',
              classInputEmail: 'FormField__Input-Error',
              classInputPassword: 'FormField__Input-Error'
            });
          }
          else if(error.response.status === 422){
            for (let key in error.response.data.errors) {
              if(key === 'email'){
                this.setState({ classInputEmail: 'FormField__AInput-Error' });
                this.setState({ errorEmail: error.response.data.errors.email[0] });
              }
              if(key === 'password'){
                this.setState({ classInputPassword: 'FormField__Input-Error' });
                this.setState({ errorPassword: error.response.data.errors.password[0] });
              }
            }
          }
        });
    }

  render(){
    return(


      <div>

      <div className="PageSwitcher">
        <NavLink to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Iniciar sesión</NavLink>
        <NavLink exact to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Registrarse</NavLink>
      </div>

      <div className="FormTitle">
        <NavLink to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Iniciar sesión</NavLink>
        ó
        <NavLink exact to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Registrarse</NavLink>
      </div>

      <div className="FormCenter">
        <label className="FormField__Label-Error" htmlFor="error"> {this.state.error} </label>
        <form className="FormFields" onSubmit={this.handleSubmit} >
          <label className="FormField__Label" htmlFor="password"> E-mail </label>
          <div className="FormField">
            <input type="email" id="email" className={this.state.classInputEmail} placeholder="Ingresa tu e-mail institucional" name="email" />
            <label className="FormField__Label-Error" htmlFor="error"> {this.state.errorEmail} </label>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="password"> Contraseña </label>
            <input type="password" id="password" className={this.state.classInputPassword} placeholder="Ingresa tu contraseña" name="password" />
            <label className="FormField__Label-Error" htmlFor="error"> {this.state.errorPassword} </label>
            <Link to="/forgot-password" className="FormField__Link--Password"> ¿Olvidaste tú contraseña? </Link>
          </div>
          <div className="FormField">
            <button type="Submit js-trigger-transition" className="FormField__Button mr-20"> Iniciar Sesión </button>
            <Link to="/sign-up" className="FormField__Link"> Crear una cuenta </Link>
          </div>
        </form>
      </div>
    </div>
    );
  }
}

export default SignInForm;
