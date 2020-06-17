import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props){
        super(props);
    
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          username: '',
        }
    }
    

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
         .then(res => console.log(res.data));
    

 // axios.post = "post" is going to send a http post request to the back end  endpoint "http://localhost:5000/users/add"
 // the endpoint is expecting a json object to its body and "user" is exactly that. An Object 
 // .then = ".then" this is a promise . what it mean is after post request apply action inside Parameter
 // res => console.log(res.data) =  "res" = result
    this.setState({
        username: ''
      })
      window.location = '/userlist';
  }

  

  render() {
    return (
        <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
            </div>
            <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
        </form>
        </div>
    )
  }
}
