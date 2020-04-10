import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';

class GroupInfo extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      clase: '',
      numeroGrupo: '',
      profesor: {},
      alumnos: {}
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
        clase: this.props.location.state.clase,
        numeroGrupo: this.props.location.state.numeroGrupo,
        profesor: this.props.location.state.profesor,
        alumnos: this.props.location.state.alumnos
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
            <label className="AssignmentInfo-Field__Label" htmlFor="name"> Numero del Grupo:  </label>
            <p className="AssignmentInfo-Result__Label">{this.state.numeroGrupo}</p>
          </div>
          <div className="AssignmentInfo-Field-Right">
            <label className="AssignmentInfo-Field__Label" htmlFor="start"> Codigo de clase: </label>
            <p className="AssignmentInfo-Result__Label">{this.state.clase}</p>
          </div>
          <div className="AssignmentInfo-Field-Right">
            <label className="AssignmentInfo-Field__Label" htmlFor="due"> Nombre del Profesor: </label>
            <p className="AssignmentInfo-Result__Label">{this.state.profesor.name + ' ' + this.state.profesor.lastname}</p>
          </div>
          <div className="AssignmentInfo-Field-Right">
            <label className="AssignmentInfo-Field__Label" htmlFor="close"> Id del Profesor: </label>
            <p className="AssignmentInfo-Result__Label">{this.state.profesor.id}</p>
          </div>
          <div className="AssignmentInfo-Field-Left">
            <label className="AssignmentInfo-Field__Label" htmlFor="grupo"> Numero de alumnos: </label>
            <p className="AssignmentInfo-Result__Label">{Object.keys(this.state.alumnos).length}</p>
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

export default GroupInfo;
