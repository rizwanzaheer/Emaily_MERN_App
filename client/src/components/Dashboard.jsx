import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import SurveyList from './surveys/SurveysList';

export default class Dashbord extends Component {
  render() {
    return (
      <div>
        <SurveyList />
        <div className="fixed-action-btn">
          <NavLink to="/surveys/new" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </NavLink>
          <ul>
            <li>
              <a className="btn-floating red">
                <i className="material-icons">insert_chart</i>
              </a>
            </li>
            <li>
              <a className="btn-floating yellow darken-1">
                <i className="material-icons">format_quote</i>
              </a>
            </li>
            <li>
              <a className="btn-floating green">
                <i className="material-icons">publish</i>
              </a>
            </li>
            <li>
              <a className="btn-floating blue">
                <i className="material-icons">attach_file</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
