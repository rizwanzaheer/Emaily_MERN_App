import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import _ from "lodash";
import SurveyField from "./SurveyField";
import validEmails from "../../utils/validateEmails";
const FIELDS = [
  { label: "Survey Title", name: "title", noValueError: "Survey Title" },
  { label: "Subject Line", name: "subject", noValueError: "Subject Line" },
  { label: "Email Body", name: "body", noValueError: "Email Body" },
  {
    label: "Recipient List",
    name: "emails",
    noValueError: 'Recipient List Seperated with "," !'
  }
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
        <form
          onSubmit={this.props.handleSubmit(() => {
            this.props.onSurveySubmit();
          })}
        >
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
  errors.emails = validEmails(values.emails || "");
  if (!values.title) {
    errors.title = "You must provide a title!";
  }
  if (!values.subject) {
    errors.subject = "You must provide a Subject!";
  }
  if (!values.body) {
    errors.body = "You must provide a Email Body!";
  }
  _.each(FIELDS, ({ name, noValueError, label }) => {
    if (!values[name]) {
      errors[name] = "You must provide " + noValueError;
    }
  });
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
