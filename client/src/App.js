import React, { Component } from 'react';
import { connect } from "react-redux";
import Quiz from './components/quiz.js';
import Header from './components/header.js';
import { setUserData } from "./actions/action";
import './App.css';



class App extends Component {

  //makes a get request to the database if the cookie exists to set the User Data History in the state.
  componentDidMount() {
    let cookieIdexists = false;
    document.cookie.split(';').map((val) => {
      return val.split('=');
    }).forEach(val => {
      if(val[0] === 'id') {
        cookieIdexists = true;
        return fetch(`/api/users/${val[1]}`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          }
        })
        .then(res => res.json())
        .then(res => {
          this.props.dispatch(setUserData(res));
        })
      }
    });

    // If cookie doesn't exists, create a user in the database. Then set the state like above.
    let expiry = new Date();
    expiry.setTime(Date.now()+(365*24*60*60*1000)); 
    expiry = expiry.toGMTString();
    if(!cookieIdexists) {
      return fetch('/api/users', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).then(res => {
         return res.json();
      }).then(result => {
         document.cookie = `id=${result[0].id}; expires= ${expiry}`;
        this.props.dispatch(setUserData(result[0]));
        return result;
      })
      .catch(err => console.error(err));
    }
  }

  render() {

    return (
      <div className="App">
       <Header />
       <Quiz />
      </div>
    );
  }
}

export default connect()(App);
