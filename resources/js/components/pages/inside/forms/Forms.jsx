import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import Form from './../../../component/form/Form';
import AddActivity from './../../../component/addActivity/AddActivity';
import axios from 'axios';

class Forms extends Component {
  state = {
    forms: [],
  }

  addForm = () => {
    let path = `/createForm`;
    this.props.history.push({
      pathname: path,
      state: {token: this.props.token}
    });
  }

  editForm = index => () => {
    let path = `/editForm`;
    this.props.history.push({
      pathname: path,
      state: {token: this.props.token, form: this.state.forms[index]}
    });
  }

  eliminateForm = index => () => {
    const { forms } = this.state;
    let r = confirm("¿Estás seguro que deseas borrar el form?");
    if(r === true){
      const form_id = (forms.splice(index, 1))[0].id;
      this.setState({forms});
      axios({
        url: '/graphql',
        method: 'post',
        headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.token}`},
        data: {
          query: `
          query {
            deleteForm(id: ${form_id}){
              id
            }
          }
          `
        }
      }).then(res => {
        console.log(res);
            })
        .catch(error => {
        console.log(error);
      });
    }

  }

  componentDidMount() {
    // Llamada a la API...

    if (this.props.isLoggedIn === '') {
      let path = `/`;
      this.props.history.push({
        pathname: path,
      });
    } else {

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
        const role = result.data.data.me.roles[0].name;
        axios({
          url: '/graphql',
          method: 'post',
          headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.token}`},
          data: {
            query: `
              query Me{
                forms{
                  id
                  name
                  admin{
                    id
                    name
                    lastname
                  }
                  questions{
                    id
                    question
                    type
                  }
                }
              }
            `
          }
        }).then((result) => {
          for(let form in result.data.data.forms){
            let form_id = result.data.data.forms[form].id;
            let nombre = result.data.data.forms[form].name;
            let admin = result.data.data.forms[form].admin;
            let preguntas = result.data.data.forms[form].questions;
              this.setState({
                forms: [...this.state.forms,
                  { nombre,
                    admin,
                    preguntas,
                    id: form_id
                  }]
              })
          }
        });
      } else {
        let path = `/dashboard`;
        this.props.history.push({
          pathname: path,
        });
      }
    }); //fin del then de la query de rol
   } //end of if
  }//end of componentDidMount

  render(){
    const { forms } = this.state;
    const { eliminateForm, addForm, editForm } = this;
    return(

        <div className="Dashboard">

          {forms && forms.map((form, index) => (
              <Form key={index} {...form} eliminateForm={eliminateForm(index)} editForm={editForm(index)}/>
          ))}

          <AddActivity add={addForm} />

        </div>
    );
  }
}

export default Forms;
