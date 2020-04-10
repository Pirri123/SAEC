import React from 'react';
import {BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';

const AddActivity = ({
  add,
}) => (
  <div onClick={add} className="Dashboard__New--Activity">
  </div>
)

export default AddActivity;
