import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateExercise extends Component {

constructor(props){
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.{{method}}.bind(this) = connects "this" in method to class

    // this.onChangeUsername = this.onChangeUsername.bind(this);
    // this.onChangeDescription = this.onChangeDescription.bind(this);
    // this.onChangeDuration = this.onChangeDuration.bind(this);
    // this.onChangeDate = this.onChangeDate.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
      // users: [] is an array of username because we are going to have a dropdown to select who the user is 
    }
}


  componentDidMount() {

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    //if (response.data.length > 0)  = if "(response.data.length > 0)"  data endpoint has a user return value.
    // this.setState= set state variable to new values after componenetDidMount
   // data.map = data is going to be an array and we are going to map (for each loop)/ return a value for every elment in the array
   //(user) = user is variable to represent and individual array

   /* what the user[0) array looks like
   id:5eb717600ef4060f5b45f0b8
   username:"chima"
   createdAt:2020-05-09T20:49:36.875+00:00
   updatedAt:2020-05-09T20:49:36.875+00:00
   __v:0 */
    //(user => user.username) = put each username inside of user array




        /* this is test code to return a value for the dropdown input
        this.setState({
        users: ['test user'],
        username: 'test user'
      })
      */

  }

// componentDidMount()= this is a react lifecycle function. Similar to onLoad. this Triggers right before a component is about to appear on the page before onLoad


  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
// onChangeUsername(e) = this is going to be called in a textbox when you edit the username box. This method binds the username globally. 
// e.target.value ? "target" equals the text box and your grabing the "value" in the text box
// in react when your definining global variable, use this.setState instead of this.state.username = e;


  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

//onChangeDate(date)  = this is going to be using a datepicker library
// We are using "date" instead of "e" because the date picker component takes in the "date" variable

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
    // window.location = direct user to homepage after completing form
  }

//onSubmit(e)  = when someone clicks the submit button put  all the data collected from each method into this object
//e.preventDefault() = this prevents the html form default behavior 
// const exercise = inside a single method you can create a variable only if they are going to be used locally inside that method



render() {
    return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
          {/* methods are not variables so they don't have the .state prefix */}
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
              {/* with a curly brace you can insert react code */
              // this.state.users.map(function(user) = this is a for loop for users in es6;
              // "return"  is where you can insert jsx (html) values in react.
              // you can have nested return values.
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
