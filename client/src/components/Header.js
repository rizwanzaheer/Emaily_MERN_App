import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <Link to="/auth/google">Login With Google </Link>
          </li>
        );
      default:
        return [
          <li key='1'>
            <Payments />
          </li>,
          <li key='2'> 
            {this.props.auth.credits}
          </li>,
          <li key='3'>
            <Link to="/api/logout">Logout</Link>
          </li>
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link className="brand-logo" to={this.props.auth ? "/surveys" : ""}>
            Emaily
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}
// pass state as a props
// state.auth usad at place of auth ES6 distruct using
const mapStateToProps = ({ auth }) => {
  // return { auth: state.auth} OR state.auth come form store
  // auth come from store state obj
  // return pass this state as a prop in component to render etc
  return { auth };
};

export default connect(mapStateToProps)(Header);
