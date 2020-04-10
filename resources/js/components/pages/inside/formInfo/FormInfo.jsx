import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';

class FormInfo extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      nombre: '',
      admin: '',
      preguntas: {}
    }
  }

  componentDidMount() {

    if (this.props.isLoggedIn === '') {
      let path = `/`;
      this.props.history.push({
        pathname: path,
      });
    }else{
      this.setState({
        nombre: this.props.location.state.nombre,
        admin: this.props.location.state.admin,
        preguntas: this.props.location.state.preguntas,
      });
    }
  }

  handleSubmit(event){
    let path = `/form`;
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="Assignment__Show--Info">
        <div className="AssignmentFields--Info">
          <div className="AssignmentInfo-Field-Left">
            <label className="AssignmentInfo-Field__Label" htmlFor="name"> Nombre del Form:  </label>
            <p className="AssignmentInfo-Result__Label">{this.state.nombre}</p>
          </div>
          <div className="AssignmentInfo-Field-Right">
            <label className="AssignmentInfo-Field__Label" htmlFor="start"> Numero de preguntas: </label>
            <p className="AssignmentInfo-Result__Label">{Object.keys(this.state.preguntas).length}</p>
          </div>
          <div className="AssignmentInfo-Field-Right">
            <label className="AssignmentInfo-Field__Label" htmlFor="due"> Nombre del Administrador: </label>
            <p className="AssignmentInfo-Result__Label">{this.state.admin.name + ' ' + this.state.admin.lastname}</p>
          </div>
        </div>
        <div className="AssignmentInfo__Right">
          <div className="AssignmentInfo__Container">
            <img className="AssignmentInfo__Image" />
          </div>
        </div>
      </div>
    );
  }
}

export default FormInfo;
