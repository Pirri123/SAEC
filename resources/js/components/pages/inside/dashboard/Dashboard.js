import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import Activity from './../../../component/activity/Activity';
import AddActivity from './../../../component/addActivity/AddActivity';
import axios from 'axios';

class Dashboard extends Component {
  state = {
    activities: [],
    roles: ''
  }

  addActivity = () => {
    let path = `/createAssignment`;
    this.props.history.push({
      pathname: path,
      state: {token: this.props.token}
    });
  }

  editActivity = index => () => {
    let path = `/editAssignment`;
    this.props.history.push({
      pathname: path,
      state: {token: this.props.token, activity: this.state.activities[index] }
    });
  }

  eliminateActivity = index => () => {
    const { activities } = this.state;
    let r = confirm("¿Estás seguro que deseas borrar la actividad?");
    if(r === true){
      const assignment_id = (activities.splice(index, 1))[0].id;
      this.setState({activities});
      axios({
        url: '/graphql',
        method: 'post',
        headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.token}`},
        data: {
          query: `
          query {
            deleteAssignment(id: ${assignment_id}){
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
        this.setState({ roles: role })
        axios({
          url: '/graphql',
          method: 'post',
          headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.token}`},
          data: {
            query: `
              query Me{
                groups{
                  class_code
                  assignments{
                    id
                    name
                    start_date
                    due_date
                    close_date
                    form{
                      id
                      name
                    }
                  }
                }
              }
            `
          }
        }).then((result) => {
          for(let group in result.data.data.groups){
            let clase = result.data.data.groups[group].class_code;
            for(let assignment in result.data.data.groups[group].assignments){
              let assignment_id = result.data.data.groups[group].assignments[assignment].id;
              let nombre = result.data.data.groups[group].assignments[assignment].name; //Cambiar
              let start_date = result.data.data.groups[group].assignments[assignment].start_date; //Cambiar
              let due_date = result.data.data.groups[group].assignments[assignment].due_date; //Cambiar
              let close_date = result.data.data.groups[group].assignments[assignment].close_date; //Cambiar
              let form_id = result.data.data.groups[group].assignments[assignment].form.id;
              let form_name = result.data.data.groups[group].assignments[assignment].form.name;
              let hour = result.data.data.groups[group].assignments[assignment].id; //Cambiar y sacar entre valores de arriba
              this.setState({
                activities: [...this.state.activities,
                  { id: assignment_id,
                    name: nombre,
                    date: "Dia " + start_date,
                    hour: "Hora: " + start_date,
                    group: "Grupo: " + clase,
                    clase,
                    start_date,
                    due_date,
                    close_date,
                    form_id,
                    form_name,
                    role
                  }]
              })
            }
          }
        })


      }else if(result.data.data.me.roles[0].name === 'professor'){
        const role = result.data.data.me.roles[0].name;
        this.setState({ roles: role })
        axios({
          url: '/graphql',
          method: 'post',
          headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.token}`},
          data: {
            query: `
              query Me{
                me {
                  groups{
                    class_code
                    assignments{
                      id
                      name
                      start_date
                      due_date
                      close_date
                      form{
                        id
                        name
                      }
                    }
                  }
                }
              }
            `
          }
        }).then((result) => {
          for(let group in result.data.data.me.groups){
            let clase = result.data.data.me.groups[group].class_code;
            for(let assignment in result.data.data.me.groups[group].assignments){
              let assignment_id = result.data.data.me.groups[group].assignments[assignment].id;
              let nombre = result.data.data.me.groups[group].assignments[assignment].name; //Cambiar
              let start_date = result.data.data.me.groups[group].assignments[assignment].start_date; //Cambiar
              let due_date = result.data.data.me.groups[group].assignments[assignment].due_date; //Cambiar
              let close_date = result.data.data.me.groups[group].assignments[assignment].close_date; //Cambiar
              let form_id = result.data.data.me.groups[group].assignments[assignment].form.id;
              let form_name = result.data.data.me.groups[group].assignments[assignment].form.name;
              let hour = result.data.data.me.groups[group].assignments[assignment].id; //Cambiar y sacar entre valores de arriba
              this.setState({
                activities: [...this.state.activities,
                  { id: assignment_id,
                    name: nombre,
                    date: "Dia " + start_date,
                    hour: "Hora: " + start_date,
                    group: "Grupo: " + clase,
                    clase,
                    start_date,
                    due_date,
                    close_date,
                    form_id,
                    form_name,
                    role
                  }]
              })
            }
          }
        });
      }else {
        const role = result.data.data.me.roles[0].name;
        this.setState({ roles: role })
        axios({
          url: '/graphql',
          method: 'post',
          headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.token}`},
          data: {
            query: `
              query Me{
                me {
                  groupStudent{
                    id
                    class_code
                    assignments{
                      id
                      name
                      start_date
                      due_date
                      close_date
                      form{
                        id
                        name
                      }
                    }
                  }
                }
              }
            `
          }
        }).then((result) => {
          //For each grupo
          for(let group in result.data.data.me.groupStudent){
            let clase = result.data.data.me.groupStudent[group].class_code;
            //For each actividad
            for(let assignment in result.data.data.me.groupStudent[group].assignments){
              let assignment_id = result.data.data.me.groupStudent[group].assignments[assignment].id;
              let nombre = result.data.data.me.groupStudent[group].assignments[assignment].name; //Cambiar
              let start_date = result.data.data.me.groupStudent[group].assignments[assignment].start_date; //Cambiar
              let due_date = result.data.data.me.groupStudent[group].assignments[assignment].due_date; //Cambiar
              let close_date = result.data.data.me.groupStudent[group].assignments[assignment].close_date; //Cambiar
              let form_id = result.data.data.me.groupStudent[group].assignments[assignment].form.id;
              let form_name = result.data.data.me.groupStudent[group].assignments[assignment].form.name;
              let hour = result.data.data.me.groupStudent[group].assignments[assignment].id; //Cambiar y sacar entre valores de arriba
              this.setState({
                activities: [...this.state.activities,
                  { id: assignment_id,
                    name: nombre,
                    date: "Dia " + start_date,
                    hour: "Hora: " + start_date,
                    group: "Grupo: " + clase,
                    clase,
                    start_date,
                    due_date,
                    close_date,
                    form_id,
                    form_name,
                    role
                  }]
              })
            }
          }
        });
      }
    });
   }//end if
  }//end of componentDidMount

  render(){
    const { activities } = this.state;
    const { eliminateActivity, addActivity, editActivity } = this;
    return(
        <div className="Dashboard">

          {activities && activities.map((activity, index) => (
              <Activity key={index} {...activity} eliminateActivity={eliminateActivity(index)} editActivity={editActivity(index)}/>
          ))}

          {(this.state.roles === 'student') ? <div /> : <AddActivity add={addActivity} />}

        </div>
    );
  }
}

export default Dashboard;
