import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

// the Exercises componenet is excepting the props passed from the exerciseList()  
// exerciseList()  => props passed exercise={(prop.1)} deleteExercise={(prop.2)} key={(prop.3)}
// ExercisesList is a class component 
// Exercises is a functional react component = what  makes the diffrent is there  is no state or lifecylce method

/*
  return this.state.exercises.map(currentexercise => {
      <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
  }

  currentexercise is the exercises[] array.   
  exercise={currentexercise}

    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
   <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>


    {props.exercise.date.substring(0,10)} = the substring(0,10) is added to condense the date formating so that you can only see the date
    <Link to={"/edit/"+props.exercise._id}>edit</Link>  =  a link to the  EditExercise class component
    onClick={() => { props.deleteExercise(props.exercise._id) }} = on click run deleteExercise() method
*/ 

export default class ExercisesList extends Component {
 
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {
        exercises: []
    };
  }


    componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({ 
            exercises: response.data
         })
      })
      .catch((error) => {
        console.log(error);
      })
  }

//   .then(response => {
//     this.setState({ exercises: response.data })
//   }) =  put data endpoint which is a list of objects inside the array exercises

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }
 //when ever you set state react will automatically update the  front end 

// exercises: this.state.exercises.filter(el => el._id !== id)=  this is to remove the exercise in the front end 
// .filter = only going to return cetain  elements that are passed in the filter  Parameter  filter(Parameter)
//(el => el._id !== id) =(el = every element inside an array return vaule )   (el._id !== id)) =  if "el._id" (exersise id) does not equal id (id passed for  deletion)
//  whenever the id of the exersise in the exercises[] array does not equal the id that we are deleting we will pass it back to the exercises[] array
// el._id  = where does the _id come from ?  the _id is from the exercises[] array that was pulled from the database (response.data)
/*
    _id:5eb71a1d2146840f7414b9aa
    username:"chima"
    description:"bike ride"
    duration:30
    date:2020-05-27T20:49:36.875+00:00
    createdAt :2020-05-09T21:01:17.564+00:00
    updatedAt:2020-05-09T21:01:17.564+00:00
    __v :0



*/


  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  // this.state.exercises.map = return every element in the exersixe array. All it does is except props  and return jsx elements
  // for every (element) currentexercise =  return an compmonent

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList()
            // calls method to return jsx
            }
          </tbody>
        </table>
      </div>
    )
  }
}
