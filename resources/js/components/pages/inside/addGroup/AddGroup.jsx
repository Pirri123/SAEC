import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import axios from 'axios';

class AddGroup extends Component {
  constructor(props){
    super(props);
    this.state = {
      alumnos: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
      console.log(res);
      let path = `/groups`;
      this.props.history.push(path);
    })
      .catch(error => {
        console.log(error);
      });
  }

  render(){
    return(
      <div className="AddActivityForm">
        <form className="FormFields" onSubmit={this.handleSubmit}>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name"> Código del Grupo </label>
            <input type="text" id="classCode" className="AddActivity__Input" placeholder="Ingresa el código de la clase (TC0001): " name="classCode" />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name"> Número del Grupo </label>
            <input type="text" id="groupNumber" className="AddActivity__Input" placeholder="Ingresa el número del grupo: " name="groupNumber" />
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
