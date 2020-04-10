import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import user from './../../../img/user.png';
import camera from './../../../img/camera.png';
import transparent from './../../../img/transparent.png';
import pen from './../../../img/pen.svg';

class Perfil extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      lastname: '',
      email: '',
      semester: '',
      mayor: '',
      campus: '',
      user_image: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // Llamada a la API...

    if (this.props.isLoggedIn === '') {
      let path = `/`;
      this.props.history.push({
        pathname: path,
      });
    }else{
      this.setState({
        name: this.props.location.state.name,
        lastname: this.props.location.state.lastname,
        email: this.props.location.state.email,
        semester: this.props.location.state.semester,
        mayor: this.props.location.state.mayor,
        campus: this.props.location.state.campus,
        user_image: this.props.location.state.image
      });
    }
  }

  handleClick(){
    console.log("Clicked");
  }

  render(){
    return(
      <div className="Profile">
        <div className="Profile__Container">
            <div className="Profile__User--ImageContainer">
              <input type="file" name="photo" id="upload-photo" />
                <img className="Profile__User--Image" src={this.state.user_image} />
                <img className="Profile__User--ImageCircle" src={transparent}/>
                <label className="Profile__User--ImageLabel"> Cambiar imagen </label>
                <label className="Profile__User--ImagePlus--Label" for="upload-photo"><img className="Profile__User--ImagePlus" src={camera} /></label>
            </div>
            <div className="Profile__Info">
              <div className="Profile__Info--Name">
                <label className="Profile__Label" htmlFor="name"> Nombre: </label>
                <label className="Profile__Label--Email" htmlFor="email"> {this.state.name} </label>
                <img className="Profile__User--Edit" src={pen} />
              </div>
              <div className="Profile__Info--Name">
                <label className="Profile__Label" htmlFor="name"> Apellidos: </label>
                <label className="Profile__Label--Email" htmlFor="email"> {this.state.lastname} </label>
                <img className="Profile__User--Edit" src={pen} />
              </div>
              <div className="Profile__Info--Name">
                <label className="Profile__Label" htmlFor="email"> Email: </label>
                <label className="Profile__Label--Email" htmlFor="email"> {this.state.email} </label>
              </div>
              <div className="Profile__Info--Name">
                <label className="Profile__Label" htmlFor="email"> Semestre: </label>
                <label className="Profile__Label--Email" htmlFor="email"> {this.state.semester} </label>
                <img className="Profile__User--Edit" src={pen} />
              </div>
              <div className="Profile__Info--Name">
                <label className="Profile__Label" htmlFor="email"> Carrera: </label>
                <label className="Profile__Label--Email" htmlFor="email"> {this.state.mayor} </label>
                <img className="Profile__User--Edit" src={pen} />
              </div>
              <div className="Profile__Info--Name">
                <label className="Profile__Label" htmlFor="email"> Campus: </label>
                <label className="Profile__Label--Email" htmlFor="email"> {this.state.campus} </label>
                <img className="Profile__User--Edit" src={pen} />
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Perfil;
