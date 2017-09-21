// Survey form Review shows their fomr inputs for review
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";

class SurveyFormReview extends Component {
  constructor(props) {
    super(props);
    this.reviewFields = formFields.map(({ name, label }) => {
      return (
        <div key={label}>
          <label htmlFor="#">{label}</label>
          <div>{this.props.formValues[name]}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h5>Please Confirm your Entries!!!</h5>
        {this.reviewFields}
        <button
          className="yellow white-text btn-flat darken-3"
          onClick={this.props.onCancel}
        >
          Back
        </button>
        <button
          onClick={() =>
            this.props.submitSurvey(this.props.formValues, this.props.history)}
          className="green btn-flat white-text right"
        >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
