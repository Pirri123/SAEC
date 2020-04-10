import React from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import image from './../../img/image.png';
import edit from './../../img/pen.svg';
import erase from './../../img/trash.svg';

const Activity = ({
  eliminateActivity,
  editActivity,
  name,
  date,
  hour,
  group,
  start_date,
  due_date,
  close_date,
  form_id,
  form_name,
  clase,
  role
}) => (
  <div className="Dashboard__Activity">
    {(role === 'student') ? <a className="boxclose-hidden" /> : <a className="boxclose" onClick={eliminateActivity}></a>}
    <img className="Dashboard__Image" src={image} />
    <div className="Dashboard__Activity--Container">
    <Link to={{pathname: '/assignment', state:{name,date,hour,group, start_date, due_date, close_date, form_id, form_name, clase, role} }} className="Link--Activity">
      <h1 className="Activity__Name">{name}</h1>
      <p className="Activity_Date">{date}</p>
      <p className="Activity_Hour">{hour}</p>
      <p className="Activity__Group"> {group}</p>
    </Link>
      {(role === 'student') ? <p /> : <img className="Activity__Erase" src={erase} onClick={eliminateActivity} />}
      {(role === 'student') ? <p /> : <img className="Activity__Edit" src={edit} onClick={editActivity} />}
    </div>
    <div className="Dashboard__Activity--Options" />
  </div>
)

export default Activity;
