import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import axios from 'axios';

class AddGroup extends Component {
  constructor(props){
    super(props);
    this.state = {
      preguntas: {},
      admin_id: ''
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
                id
                roles{
                  name
                }
              }
            }
            `
          }
        }).then((result) => {
          if (result.data.data.me.roles[0].name === 'admin') {
            this.setState({ admin_id: result.data.data.me.id })
          } else {
            let path = `/dashboard`;
            this.props.history.push({
              pathname: path,
            });
          }
        });

      }
    }

  handleSubmit(event) {
    event.preventDefault();

    const nombre = formName.value;
    const admin = this.state.admin_id;

    axios({
      url: '/graphql',
      method: 'post',
      headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.token}`},
      data: {
        query: `
        query {
        	  createForm(
              name: "${nombre}",
              admin_id: "${admin}"
          ) {
            id
            name
            admin{
              id
            }
          }
        }
        `
      }
    }).then(res => {
      console.log(res);
      let path = `/forms`;
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
            <label className="FormField__Label" htmlFor="name"> Nombre del Form </label>
            <input type="text" id="formName" className="AddActivity__Input" placeholder="Ingresa el nombre del form: " name="formName" />
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
