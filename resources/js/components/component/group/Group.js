import React from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import image from './../../img/image.png';
import edit from './../../img/pen.svg';
import erase from './../../img/trash.svg';

const Group = ({
  id,
  clase,
  numeroGrupo,
  alumnos,
  profesor,
  eliminateGroup,
  editGroup
}) => (
  <div className="Dashboard__Activity">
    <a className="boxclose" onClick={eliminateGroup}></a>
    <img className="Dashboard__Image" src={image} />
    <div className="Dashboard__Activity--Container">
    <Link to={{pathname: '/group', state:{clase,numeroGrupo, alumnos, profesor, id} }} className="Link--Activity">
      <h1 className="Activity__Name">{'Clase: ' + clase}</h1>
      <p className="Activity_Date">{'Número de grupo: ' + numeroGrupo}</p>
      <p className="Activity_Hour">{'Profesor: ' + profesor.name + ' ' + profesor.lastname}</p>
      <p className="Activity__Group"> {'Número de alumnos: ' + Object.keys(alumnos).length}</p>
    </Link>
       <img className="Activity__Erase" src={erase} onClick={eliminateGroup} />
       <img className="Activity__Edit" src={edit} onClick={editGroup} />
    </div>
    <div className="Dashboard__Activity--Options" />
  </div>
)

export default Group;
