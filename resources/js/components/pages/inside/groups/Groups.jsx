import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import Group from './../../../component/group/Group';
import AddActivity from './../../../component/addActivity/AddActivity';
import axios from 'axios';

class Groups extends Component {
  state = {
    groups: [],
  }

  addGroup = () => {
    let path = `/createGroup`;
    this.props.history.push({
      pathname: path,
      state: {token: this.props.token}
    });
  }

  editGroup = index => () => {
    let path = `/editGroup`;
    this.props.history.push({
      pathname: path,
      state: {token: this.props.token, group: this.state.groups[index]}
    });
  }

  eliminateGroup = index => () => {
    const { groups } = this.state;
    let r = confirm("¿Estás seguro que deseas borrar el grupo?");
    if(r === true){
      const groups_id = (groups.splice(index, 1))[0].id;
      this.setState({groups});
      axios({
        url: '/graphql',
        method: 'post',
        headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.token}`},
        data: {
          query: `
          query {
            deleteGroup(id: ${groups_id}){
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

      if (this.props.role === 'admin') {
        axios({
          url: '/graphql',
          method: 'post',
          headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.token}`},
          data: {
            query: `
              query Me{
                groups{
                  id
                  class_code
                  group_number
                  students{
                    id
                    name
                    lastname
                    email
                    semester
                    mayor
                   }
                  professor{
                    id
                    name
                    lastname
                  }
                }
              }
            `
          }
        }).then((result) => {
          for(let group in result.data.data.groups){
            let group_id = result.data.data.groups[group].id;
            let clase = result.data.data.groups[group].class_code;
            let numeroGrupo = result.data.data.groups[group].group_number;
            let alumnos = result.data.data.groups[group].students;
            let profesor = result.data.data.groups[group].professor;
              this.setState({
                groups: [...this.state.groups,
                  { clase,
                    numeroGrupo,
                    alumnos,
                    profesor,
                    id: group_id
                  }]
              })

          }
        });
      } else if(this.props.role === 'professor'){
        axios({
          url: '/graphql',
          method: 'post',
          headers: {'Content-type': 'application/json' , 'Accept': 'application/json', 'Authorization':  `Bearer ${this.props.token}`},
          data: {
            query: `
              query Me{
                me{
                  groups{
                    id
                    class_code
                    group_number
                    students{
                      id
                      name
                      lastname
                      email
                      semester
                      mayor
                     }
                    professor{
                      id
                      name
                      lastname
                    }
                  }
                }
              }
            `
          }
        }).then((result) => {
          for(let group in result.data.data.me.groups){
            let group_id = result.data.data.me.groups[group].id;
            let clase = result.data.data.me.groups[group].class_code;
            let numeroGrupo = result.data.data.me.groups[group].group_number;
            let alumnos = result.data.data.me.groups[group].students;
            let profesor = result.data.data.me.groups[group].professor;
              this.setState({
                groups: [...this.state.groups,
                  { clase,
                    numeroGrupo,
                    alumnos,
                    profesor,
                    id: group_id
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

   } //end of if
  }//end of componentDidMount

  render(){
    const { groups } = this.state;
    const { eliminateGroup, addGroup, editGroup } = this;
    return(
        <div className="Dashboard">

          {groups && groups.map((group, index) => (
              <Group key={index} {...group} eliminateGroup={eliminateGroup(index)} editGroup={editGroup(index)}/>
          ))}

          <AddActivity add={addGroup} />

        </div>
    );
  }
}

export default Groups;
