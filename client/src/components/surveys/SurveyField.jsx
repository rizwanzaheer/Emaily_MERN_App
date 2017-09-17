import React, { Component } from "react";

export default class SurveyField extends Component {
  render() {
    console.log(this.props.meta);
    const {error, touched} = this.props.meta;
    console.log('error ', error);
    console.log('touched ', touched);
    return (
      <div>
        <label htmlFor="#">{this.props.label}</label>
        <input {...this.props.input} />
        {
          touched && error
        }
      </div>
    );
  }
}
