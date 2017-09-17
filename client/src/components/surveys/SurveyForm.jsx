import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import _ from "lodash";
import SurveyField from "./SurveyField";

const FIELDS = [
  { label: "Survey Title", name: "title" },
  { label: "Subject Line", name: "subject" },
  { label: "Email Body", name: "body" },
  { label: "Recipient List", name: "emails" }
];

class SurveyForm extends Component {
  constructor(props) {
    super(props);
    this.renderFields = this.renderFields.bind(this);
  }
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        Survey Form with redux form!
        <form onSubmit={this.props.handleSubmit(value => console.log(value))}>
          {this.renderFields()}
          <NavLink className="red btn-flat white-text" to="/surveys">
            Cancel
            <i className="material-icons right">cancel</i>
          </NavLink>
          <button className="teal btn-flat right white-text" type="submit">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'You must provide a title!';
  } else {
    console.log('form submited successfuly!');
  }
  // if errors obj is empty then redux form says 
  // Oo good to good with no errors
  // If have any key values pair then redux form says
  // Oo I didn't submit this form due to errors :p
  return errors;
}
export default reduxForm({
  validate,
  form: "surveyForm"
})(SurveyForm);
