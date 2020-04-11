import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import axios from 'axios';

class AddGroup extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      alumnos: {},
      classInputClass: 'FormField_Input',
      classInputGroup: 'FormField_Input',
      errorClass: '',
      errorGroup: ''
    };
  }

  componentDidMount() {
    // Llamada a la API...

      if (this.props.isLoggedIn === '') {
        let path = `/`;
        this.props.history.push({
          pathname: path,
        });
      }else {
        axios({
          url: '/graphql',
          method: 'post',
          headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.token}`},
          data: {
            query: `
            query {
              me{
                roles{
                  name
                }
              }
            }
            `
          }
        }).then((result) => {
          if (result.data.data.me.roles[0].name === 'admin') {
          } else if (result.data.data.me.roles[0].name === 'professor') {

          } else {
            let path = `/dashboard`;
            this.props.history.push({
              pathname: path,
            });
          }
        });

        //sacar estudiantes del API
      }
    }

  handleSubmit(event) {
    event.preventDefault();

    const clase = classCode.value;
    const numero = groupNumber.value;

    axios({
      url: '/graphql',
      method: 'post',
      headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.token}`},
      data: {
        query: `
        query {
        	  createGroup(
            class_code: "${clase}",
            group_number: ${numero}
          ) {
            id
            class_code
            group_number
          }
        }
        `
      }
    }).then(res => {
      const response = JSON.parse(res.request.response);
      if (response.errors){
        if (typeof(clase) === 'string' && clase.length > 10){
          this.setState(() => ({
            classInputClass: 'FormField_AInput-Error',
            errorClass: 'El código del grupo debe de tener menos de 10 carácteres'
          }));
        }

        if (numero > 100){
          //Error: group Number is too big

            this.setState(() => ({
              classInputGroup: 'FormField_AInput-Error',
              errorGroup: 'El número del grupo debe ser menor a 100'
            }));
        }
         else if (response.errors[0].debugMessage){
          this.setState(() => ({
            classInputGroup: 'FormField_AInput-Error',
            errorGroup: 'El número del grupo solo admite números'
          }));
        } 

        if (clase === "") {
          this.setState(() => ({
            classInputClass: 'FormField_AInput-Error',
            errorClass: 'El código del grupo no puede estar vacio'
          }));
          
        }
        if (numero === "") {
            this.setState(() => ({
              classInputGroup: 'FormField_AInput-Error',
              errorGroup: 'El número del grupo no puede estar vacio'
            }));
        } 

        if (numero !== '' && numero < 100 ){
          this.setState(() => ({
            classInputGroup: 'FormField_AInput-Error',
            errorGroup: ''
          }));
        }

        if (typeof(clase) === 'string' && clase.length > 0 && clase.length <= 10){
          this.setState(() => ({
            classInputClass: 'FormField_AInput-Error',
            errorClass: ''
          }));
        }
        
      } else{
        let path = `/groups`;
        this.props.history.push(path);
      }
      
      
    })
      .catch(error => {
        console.log(error);
        //For some reason, no errors get catched, so everything is handled in the then.
      });
  }

  render(){
    return(
      <div className="AddActivityForm">
        <form className="FormFields" onSubmit={this.handleSubmit}>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name"> Código del Grupo </label>
            <input type="text" id="classCode" className="AddActivity__Input" placeholder="Ingresa el código de la clase (TC0001): " name="classCode" />
            <label className="FormField__Label-Error" htmlFor="error"> {this.state.errorClass} </label>
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name"> Número del Grupo </label>
            <input type="text" id="groupNumber" className="AddActivity__Input" placeholder="Ingresa el número del grupo: " name="groupNumber" />
            <label className="FormField__Label-Error" htmlFor="error"> {this.state.errorGroup} </label>
          </div>
          <div className="FormField">
            <button className="FormField__Button mr-20"> Crear Grupo </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddGroup;
