import React from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import image from './../../img/image.png';
import edit from './../../img/pen.svg';
import erase from './../../img/trash.svg';

const Form = ({
  nombre,
  admin,
  preguntas,
  id,
  eliminateForm,
  editForm
}) => (
  <div className="Dashboard__Activity">
    <a className="boxclose" onClick={eliminateForm}></a>
    <img className="Dashboard__Image" src={image} />
    <div className="Dashboard__Activity--Container">
    <Link to={{pathname: '/form', state:{nombre, admin, preguntas, id} }} className="Link--Activity">
      <h1 className="Activity__Name">{nombre}</h1>
      <p className="Activity_Date">{'Admin del Form: ' + admin.name + ' ' + admin.lastname}</p>
      <p className="Activity__Group"> {'Número de preguntas: ' + Object.keys(preguntas).length}</p>
    </Link>
       <img className="Activity__Erase" src={erase} onClick={eliminateForm} />
       <img className="Activity__Edit" src={edit} onClick={editForm} />
    </div>
    <div className="Dashboard__Activity--Options" />
  </div>
)

export default Form;
