import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';

class AssignmentInfo extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
      start_date: '',
      due_date: '',
      close_date: '',
      clase: '',
      form_name: ''
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
        name: this.props.location.state.name,
        start_date: this.props.location.state.start_date,
        due_date: this.props.location.state.due_date,
        close_date: this.props.location.state.close_date,
        clase: this.props.location.state.clase,
        form_name: this.props.location.state.form_name
      });
    }
  }

  handleSubmit(event){
    let path = `/doForm`;
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="Assignment__Show--Info">
        <div className="AssignmentFields--Info">
          <div className="AssignmentInfo-Field-Left">
            <label className="AssignmentInfo-Field__Label" htmlFor="name"> Nombre de la actividad:  </label>
            <p className="AssignmentInfo-Result__Label">{this.state.name}</p>
          </div>
          <div className="AssignmentInfo-Field-Right">
            <label className="AssignmentInfo-Field__Label" htmlFor="start"> Dia y Hora de Inicio: </label>
            <p className="AssignmentInfo-Result__Label">{this.state.start_date}</p>
          </div>
          <div className="AssignmentInfo-Field-Right">
            <label className="AssignmentInfo-Field__Label" htmlFor="due"> Dia y Hora de Fin: </label>
            <p className="AssignmentInfo-Result__Label">{this.state.due_date}</p>
          </div>
          <div className="AssignmentInfo-Field-Right">
            <label className="AssignmentInfo-Field__Label" htmlFor="close"> Dia y Hora de Cierre: </label>
            <p className="AssignmentInfo-Result__Label">{this.state.close_date}</p>
          </div>
          <div className="AssignmentInfo-Field-Left">
            <label className="AssignmentInfo-Field__Label" htmlFor="grupo"> Grupo: </label>
            <p className="AssignmentInfo-Result__Label">{this.state.clase}</p>
          </div>
          <div className="AssignmentInfo-Field-Left">
            <label className="AssignmentInfo-Field__Label" htmlFor="form"> Prueba a realizar: </label>
            <p className="AssignmentInfo-Result__Label">{this.state.form_name}</p>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="AssignmentInfo-Field">
              {(this.props.role !== 'student') ? <p /> : <button className="AssignmentInfo__Button mr-20"> Realizar Actividad </button>}
            </div>
          </form>
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

export default AssignmentInfo;
