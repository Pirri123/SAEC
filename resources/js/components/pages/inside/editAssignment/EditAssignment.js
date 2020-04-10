import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import Calendar from './../../../component/date/Date';
import FinalDate from './../../../component/date/CloseDate';
import Time from './../../../component/hour/Hour';
import Group from './../../../component/selectGroup/SelectGroup';
import Form from './../../../component/selectForm/SelectForm';
import pen from './../../../img/pen.svg';
import check from './../../../img/check2.svg';
import cross from './../../../img/cross.svg';
import axios from 'axios';

class EditAssignment extends Component {
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
      name: this.props.location.state.activity.name,
      start_date: this.props.location.state.activity.start_date,
      due_date: this.props.location.state.activity.due_date,
      close_date: this.props.location.state.activity.close_date,
      group: this.props.location.state.activity.clase,
      form: this.props.location.state.activity.form_name
    };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.getDate = this.getDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showInput = this.showInput.bind(this);
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

  showInput(){
    document.getElementById("Input").style.display = "none";
    document.getElementById("InputHide").style.display = "inline-block";
  }

  showLabelName(){
    document.getElementById("Input").style.display = "block";
    document.getElementById("InputHide").style.display = "none";
  }

  showCalendar(){
    document.getElementById("Calendar").style.display = "none";
    document.getElementById("HiddenCalendar").style.display = "block";
  }

  showStartDateHour(){
    document.getElementById("Calendar").style.display = "block";
    document.getElementById("HiddenCalendar").style.display = "none";
  }

  showCloseCalendar(){
    document.getElementById("CloseDate").style.display = "none";
    document.getElementById("HiddenFinal").style.display = "block";
  }

  showCloseLabel(){
    document.getElementById("CloseDate").style.display = "block";
    document.getElementById("HiddenFinal").style.display = "none";
  }


  showSelectGroup(){
    document.getElementById("GroupShow").style.display = "none";
    document.getElementById("HiddenGroup").style.display = "block";
  }

  showLabelGroup(){
    document.getElementById("GroupShow").style.display = "block";
    document.getElementById("HiddenGroup").style.display = "none";
  }

  showSelectForm(){
    document.getElementById("FormShow").style.display = "none";
    document.getElementById("HiddenForm").style.display = "block";
  }

  showLabelForm(){
    document.getElementById("FormShow").style.display = "block";
    document.getElementById("HiddenForm").style.display = "none";
  }

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
        	  updateAssignment(
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
    console.log(this.props.location.state.activity);

    return(
      <div className="EditActivityForm">
        <form className="FormFields-Edit" onSubmit={this.handleSubmit}>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name"> Nombre de la actividad </label>
              <div className="AssignmentInfo-together" id="Input">
                <p className="AssignmentInfo-together__Label">{this.state.name}</p>
                <img className="AssignmentInfo--Edit" onClick={this.showInput} src={pen} />
              </div>

              <div className="AssignmentInfo--hidden" id="InputHide">
                <input type="text" id="firstname" className="EditActivity__Input" placeholder="Ingresa el nuevo nombre de la actividad" name="firstname" />
                <img className="AssignmentInfo--Edit--Cancel" onClick={this.showLabelName} src={cross} />
                <img className="AssignmentInfo--Edit--Save" onClick={this.showLabelName} src={check} />
              </div>

          </div>


          <div className="FormField-Calendar">
            <label className="FormField__Label" htmlFor="day"> Dia de Inicio y Fin de la Actividad </label>
              <div className="AssignmentInfo-together--Calendar" id="Calendar">
                <p className="AssignmentInfo-together__Label">{this.state.start_date}</p>
                <img className="AssignmentInfo--Edit" onClick={this.showCalendar} src={pen} />
              </div>

            <div className="Calendar--hidden" id="HiddenCalendar">

              <Calendar
                onChange={this.handleChangeDate}
              />

              <Time
                onChangeBegin={this.handleChangeBegin}
                onChangeEnd={this.handleChangeEnd}
              />

            <img className="Calendar--Edit--Save" onClick={this.showStartDateHour} src={check} />
            <img className="Calendar--Edit--Cancel" onClick={this.showStartDateHour} src={cross} />
            </div>

          </div>


          <div className="FormField">
            <label className="FormField__Label" htmlFor="close"> Cierre de la Actividad </label>
              <div className="AssignmentInfo-together--CloseDate" id="CloseDate">
                <p className="AssignmentInfo-together__Label">{this.state.close_date}</p>
                <img className="AssignmentInfo--Edit" onClick={this.showCloseCalendar} src={pen} />
              </div>

            <div className="CloseDate--hidden" id="HiddenFinal">
              <FinalDate
                onChange={this.handleChangeEndDate}
              />

            <img className="Calendar--Edit--Save" onClick={this.showCloseLabel} src={check} />
            <img className="Calendar--Edit--Cancel" onClick={this.showCloseLabel} src={cross} />

            </div>

          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="grupo"> Grupo </label>
              <div className="AssignmentInfo-together--Group" id="GroupShow">
                <p className="AssignmentInfo-together__Label">{this.state.group}</p>
                <img className="AssignmentInfo--Edit" onClick={this.showSelectGroup} src={pen} />
              </div>

            <div className="Group--hidden" id="HiddenGroup">
              <Group
                options={this.state.groups}
                onChangeGroup={this.handleChangeGroup}
              />
            <img className="Select--Edit--Save" onClick={this.showLabelGroup} src={check} />
            <img className="Select--Edit--Cancel" onClick={this.showLabelGroup} src={cross} />
            </div>

          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="grupo"> Form </label>
              <div className="AssignmentInfo-together--Form" id="FormShow">
                <p className="AssignmentInfo-together__Label">{this.state.form}</p>
                <img className="AssignmentInfo--Edit" onClick={this.showSelectForm} src={pen} />
              </div>

            <div className="Form--hidden" id="HiddenForm">
              <Form
                options={this.state.forms}
                onChangeForm={this.handleChangeForm}
              />
            <img className="Select--Edit--Save" onClick={this.showLabelForm} src={check} />
            <img className="Select--Edit--Cancel" onClick={this.showLabelForm} src={cross} />
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

export default EditAssignment;
