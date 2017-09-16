import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

class SurveyForm extends Component {
  render() {
    return (
      <div>
        Survey Form with redux form!
        <form onSubmit={this.props.handleSubmit(value => console.log(value))}>
          <Field
            placholder="survey"
          type="text" name="surveyTitle" component="input" />
          <button type="submit">Submit</button>
         </form>
      </div>
      
    );
  }
}
export default reduxForm({
  form: "surveyForm"
})(SurveyForm);
