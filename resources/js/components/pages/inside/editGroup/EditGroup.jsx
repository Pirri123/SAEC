import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import pen from './../../../img/pen.svg';
import check from './../../../img/check2.svg';
import cross from './../../../img/cross.svg';
import axios from 'axios';

class EditGroup extends Component {
  constructor(props){
    super(props);
    this.state = {
      alumnos: {},
      name: this.props.location.state.group.clase,
      group_number: this.props.location.state.group.numeroGrupo,
      id: this.props.location.state.group.id,
      classInputClass: 'FormField_Input',
      classInputGroup: 'FormField_Input',
      errorClass: '',
      errorGroup: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveCode = this.saveCode.bind(this);
    this.saveGroup = this.saveGroup.bind(this);
  }

  //Group Code

  showInput(){
    document.getElementById("Input").style.display = "none";
    document.getElementById("InputHide").style.display = "inline-block";
  }

  saveCode(){
    const code = classCode.value;
    if (code !== '') {
      this.setState({
        name: code
      });
    }
    document.getElementById("Input").style.display = "block";
    document.getElementById("InputHide").style.display = "none";
  }

  showLabelName(){
    classCode.value = '';
    document.getElementById("Input").style.display = "block";
    document.getElementById("InputHide").style.display = "none";
  }

  //Group Number

  showGroup(){
    document.getElementById("InputGroup").style.display = "none";
    document.getElementById("InputGroupHide").style.display = "inline-block";
  }

  saveGroup(){
    const group = groupNumber.value;
    if (group !== '') {
      this.setState({
        group_number: group
      });
    }
    document.getElementById("InputGroup").style.display = "block";
    document.getElementById("InputGroupHide").style.display = "none";
  }

  showLabelGroup(){
    groupNumber.value = '';
    document.getElementById("InputGroup").style.display = "block";
    document.getElementById("InputGroupHide").style.display = "none";
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

    const id = this.state.id;
    const clase = this.state.name;
    const numero = this.state.group_number;

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

            <div className="AssignmentInfo-together" id="Input">
              <p className="AssignmentInfo-together__Label">{this.state.name}</p>
              <img className="AssignmentInfo--Edit" onClick={this.showInput} src={pen} />
            </div>

            <div className="AssignmentInfo--hidden" id="InputHide">
              <input type="text" id="classCode" className="EditActivity__Input" placeholder="Ingresa el código de la clase (TC0001): " name="classCode" />
              <img className="AssignmentInfo--Edit--Cancel" onClick={this.showLabelName} src={cross} />
              <img className="AssignmentInfo--Edit--Save" onClick={this.saveCode} src={check} />
            </div>
            <label className="FormField__Label-Error" htmlFor="error"> {this.state.errorClass} </label>
        </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="name"> Número del Grupo </label>

              <div className="AssignmentInfo-together" id="InputGroup">
                <p className="AssignmentInfo-together__Label">{this.state.group_number}</p>
                <img className="AssignmentInfo--Edit" onClick={this.showGroup} src={pen} />
              </div>

              <div className="AssignmentInfo--hidden" id="InputGroupHide">
                <input type="text" id="groupNumber" className="EditActivity__Input" placeholder="Ingresa el número del grupo: " name="groupNumber" />
                <img className="AssignmentInfo--Edit--Cancel" onClick={this.showLabelGroup} src={cross} />
                <img className="AssignmentInfo--Edit--Save" onClick={this.saveGroup} src={check} />
              </div>
              <label className="FormField__Label-Error" htmlFor="error"> {this.state.errorGroup} </label>
          </div>
          <div className="FormField">
            <button className="FormField__Button mr-20"> Guardar Cambios </button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditGroup;
