import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

export default class SurveyNew extends Component {
  state = {
    showFormReview: false
  };
  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview />;
    }
    return (
      <SurveyForm onSurveySubmit={() => this.state({ showFormReview: true })} />
    );
  }
  render() {
    return this.renderContent();
  }
}
