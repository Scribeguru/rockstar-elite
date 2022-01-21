import React, { useState, useEffect } from 'react';
import { Col } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

export default function SavedWorkouts({ workout, workouts, setWorkouts, exercises, setExercises }) {

  const [selected, setSelected] = useState(JSON.parse(localStorage.getItem('selected-exercises')) || []);

  useEffect(() => {
    localStorage.setItem('selected-exercises', JSON.stringify(exercises.filter(exercise => exercise.selected)));
  }, [selected, exercises]);

  function deleteWorkout() {
    try {
      fetch(baseUrl + 'workouts/' + workout._id, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          setWorkouts(workouts.filter(workout => workout._id !== res._id));
          console.log(res);
        })
    }
    catch (err) {
      alert(err);
    }
  }

  function toggleSelect() {
    console.log(workout.exercises)
    console.log(localStorage.getItem('selected-exercises'));
  }

  return (
    <>
      <Col xs="4" className="my-auto">
        <i onClick={deleteWorkout} className="exercise-option fa fa-trash fa-sm" />
      </Col>
      <Col
        className="exercise-name my-auto"
        onClick={toggleSelect}
      >
        {workout.name}
        {/* {exercise.selected ? <span className="ml-1"><em>(selected)</em></span> : null} */}
      </Col>
      <Col xs="4">
        <Col>
          {workout.exercises.map(exercise => {
            return (
              <Col>{"(" + exercise.name + ")"}</Col>
            );
          })}
        </Col>
      </Col>

    </>

  );

}