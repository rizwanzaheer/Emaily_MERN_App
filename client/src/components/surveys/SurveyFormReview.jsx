// Survey form Review shows their fomr inputs for review
import React, { Component } from "react";
import { connect } from "react-redux";

class SurveyFormReview extends Component {
  render() {
    return (
      <div>
        <h2>Please Confirm your Entries!!!</h2>
        <button
          className="yellow darken-3 btn-flat"
          onClick={this.props.onCancel}
        >
          Back
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.info(state);
  return {};
};

export default connect(mapStateToProps)(SurveyFormReview);
