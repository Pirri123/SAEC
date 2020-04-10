import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import pen from './../../../img/pen.svg';
import check from './../../../img/check2.svg';
import cross from './../../../img/cross.svg';
import axios from 'axios';

class EditForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      preguntas: {},
      admin_id: '',
      id: this.props.location.state.form.id,
      name: this.props.location.state.form.nombre
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveName = this.saveName.bind(this);
  }

  //Group Code

  showInput(){
    document.getElementById("Input").style.display = "none";
    document.getElementById("InputHide").style.display = "inline-block";
  }

  saveName(){
    const code = formName.value;
    if (code !== '') {
      this.setState({
        name: code
      });
    }
    document.getElementById("Input").style.display = "block";
    document.getElementById("InputHide").style.display = "none";
  }

  showLabelName(){
    formName.value = '';
    document.getElementById("Input").style.display = "block";
    document.getElementById("InputHide").style.display = "none";
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

    const id = this.state.id;
    const name = this.state.name;

    axios({
      url: '/graphql',
      method: 'post',
      headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.token}`},
      data: {
        query: `
        query {
        	  updateForm(
              id: ${id},
              name: "${name}"
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

              <div className="AssignmentInfo-together" id="Input">
                <p className="AssignmentInfo-together__Label">{this.state.name}</p>
                <img className="AssignmentInfo--Edit" onClick={this.showInput} src={pen} />
              </div>

              <div className="AssignmentInfo--hidden" id="InputHide">
                <input type="text" id="formName" className="EditActivity__Input" placeholder="Ingresa el nombre del form: " name="formName" />
                <img className="AssignmentInfo--Edit--Cancel" onClick={this.showLabelName} src={cross} />
                <img className="AssignmentInfo--Edit--Save" onClick={this.saveName} src={check} />
              </div>

          </div>
          <div className="FormField">
            <button className="FormField__Button mr-20"> Guardar Cambios </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditForm;
