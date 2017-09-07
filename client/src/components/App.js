import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';

const Landing = () => <h2>Welcome to React</h2>;
const Contact = () => <h2>contact</h2>;
const Surveys = () => <h2>Surveys Dashboard</h2>;

class App extends Component {
  componentDidMount = () => {
    this.props.fetchUser();
  }
  
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Header />
            <Route exact path="/" component={Landing}/>
            <Route exact path="/surveys" component={Surveys}/>
            <Route path="/surveys/contact" component={Contact}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, actions)(App);
