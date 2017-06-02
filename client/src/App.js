import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { connect } from "react-redux";


import Quiz from './components/quiz.js';

import Header from './components/header.js';

import { setUserData } from "./actions/action";



class App extends Component {

//makes a get request to the database if the cookie exists to set the User Data History in the state.
  componentDidMount(){
    let cookieIdexists = false;
    let cookieId = document.cookie.split(';').map((val) => {
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
          console.log(res);
          this.props.dispatch(setUserData(res));
        })
      }
    });

// If cookie doesn't exists, create a user in the database. Then set the state like above.
    if(!cookieIdexists) {
      return fetch('/api/users', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      }).then(res => {
        console.log(res);
        return res.json();
      }).then(result => {
        console.log(result[0].id);
        document.cookie = `id=${result[0].id}`;
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
