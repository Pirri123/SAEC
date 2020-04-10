import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import Calendar from './../../../component/date/Date';
import FinalDate from './../../../component/date/CloseDate';
import Time from './../../../component/hour/Hour';
import Group from './../../../component/selectGroup/SelectGroup';
import Form from './../../../component/selectForm/SelectForm';
import axios from 'axios';

class AddAssignment extends Component {
  constructor(props){
    super(props);
    this.state = {
      groups: [],
      forms: [],
      from: null,
      to: null,
      fromFinal: null,
      selectedOptionBegin: null,
      selectedOptionEnd: null,
      selectedOptionGroup: null,
      selectedOptionForm: null,
      activityName: null
    };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.getDate = this.getDate.bind(this);
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
          headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.location.state.token}`},
          data: {
            query: `
            query Me{
            	groups{
                id
                class_code
              }
              forms{
                id
                name
              }
            }
            `
          }
        }).then((result) => {
          for(let grupo in result.data.data.groups){
            let code = result.data.data.groups[grupo].class_code;
            let number = result.data.data.groups[grupo].id;
            this.setState({
              groups: [...this.state.groups,
                {
                value: code,
                label: code,
                id: number
                }]
              })
          }
          for(let form in result.data.data.forms){
            let formName = result.data.data.forms[form].name;
            let number = result.data.data.forms[form].id;
            this.setState({
              forms: [...this.state.forms,
                {
                value: formName,
                label: formName,
                id: number
                }]
              })
          }
        });
      }
    }

  handleChangeDate(state) {
    this.setState(state);
  } //funciona

  handleChangeBegin = (selectedOption) => {
    this.setState({selectedOptionBegin : selectedOption });
  }//funciona

  handleChangeEnd = (selectedOption) => {
    this.setState({selectedOptionEnd : selectedOption });
  }//funciona

  handleChangeGroup = (selectedOption) => {
    this.setState({selectedOptionGroup : selectedOption });
  }//funciona

  handleChangeForm = (selectedOption) => {
    this.setState({selectedOptionForm : selectedOption });
  }//funciona

  handleChangeEndDate(date) {
    this.setState({fromFinal: date});
  }//funciona

  getDate(date){
    let mes = date.toString().slice(4, 7);
    let dia = date.toString().slice(8, 10);
    let year = date.toString().slice(11, 15);
    switch (mes) {
      case 'Jan':
        mes = "01";
        break;
      case 'Feb':
        mes = "02";
        break;
      case 'Mar':
        mes = "03";
        break;
      case 'Apr':
        mes = "04";
        break;
      case 'May':
        mes = "05";
        break;
      case 'Jun':
        mes = "06";
        break;
      case 'Jul':
        mes = "07";
        break;
      case 'Aug':
        mes = "08";
        break;
      case 'Sep':
        mes = "09";
        break;
      case 'Oct':
        mes = "10";
        break;
      case 'Nov':
        mes = "11";
        break;
      case 'Dec':
        mes = "12";
        break;
      default:

        break;
    }
    let theDate = `${year}-${mes}-${dia}`;
    return theDate;
  }//funciona

  handleSubmit(event) {
    event.preventDefault();

    const actName = firstname.value;
    const form = parseInt(this.state.selectedOptionForm.id,10);
    const group = parseInt(this.state.selectedOptionGroup.id,10);

    console.log(actName);
    console.log(form);
    console.log(group);

    const start = this.getDate(this.state.from);
    const due = this.getDate(this.state.to);
    const close = this.getDate(this.state.fromFinal);

    const hourInit = this.state.selectedOptionBegin.value + ":00";
    const hourEnd = this.state.selectedOptionEnd.value + ":00";

    const startHour = start + " " + hourInit;
    const dueHour = due + " " + hourEnd;
    const closeHour = close + " 12:00:00"

    console.log(startHour);
    console.log(dueHour);
    console.log(closeHour);

    axios({
      url: '/graphql',
      method: 'post',
      headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.location.state.token}`},
      data: {
        query: `
        query {
        	  createAssignment(
            name: "${actName}",
            start_date: "${startHour}" ,
            due_date: "${dueHour}" ,
            close_date: "${closeHour}" ,
            form_id: ${form} ,
            group_id: ${group}
          ) {
            name
            start_date
            due_date
            close_date
            form{id}
            group{id}
          }
        }
        `
      }
    }).then(res => {
      console.log(res);
      let path = `/dashboard`;
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
            <label className="FormField__Label" htmlFor="name"> Nombre de la actividad </label>
            <input type="text" id="firstname" className="AddActivity__Input" placeholder="Ingresa el nombre de la actividad" name="firstname" />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="day"> Dia de Inicio y Fin de la Actividad </label>
            <Calendar
              onChange={this.handleChangeDate}
            />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="time"> Hora de la Actividad </label>
            <Time
              onChangeBegin={this.handleChangeBegin}
              onChangeEnd={this.handleChangeEnd}
            />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="close"> Cierre de la Actividad </label>
            <FinalDate
              onChange={this.handleChangeEndDate}
            />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="grupo"> Grupo </label>
            <Group
              options={this.state.groups}
              onChangeGroup={this.handleChangeGroup}
            />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="grupo"> Form </label>
            <Form
              options={this.state.forms}
              onChangeForm={this.handleChangeForm}
            />
          </div>
          <div className="FormField">
            <button className="FormField__Button mr-20"> Crear Actividad </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddAssignment;
