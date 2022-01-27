import React, { useState, useEffect } from 'react';
import { Col } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

export default function SavedWorkouts({ selected, setSelected, workout, workouts, setWorkouts, exercises, setExercises }) {

  function select() {
    let currentExercises = workout.exercises.map(exercise => exercise.name + exercise.strengthOrCardio);
    setSelected(exercises.filter(exercise => {
      let name = exercise.name;
      let strengthOrCardio = exercise.strengthOrCardio;
      if (currentExercises.includes(name + strengthOrCardio)) {
        return exercise;
      }
    }));
    exercises.forEach(exercise => {
      let name = exercise.name;
      let strengthOrCardio = exercise.strengthOrCardio;
      if (currentExercises.includes(name + strengthOrCardio)) {
        exercise.selected = true;
      }
    });
    console.log(selected, currentExercises);
  }

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

  return (
    <>
      <Col xs="4" className="my-auto">
        <i onClick={deleteWorkout} className="exercise-option fa fa-trash fa-sm" />
      </Col>
      <Col
        className={`${(workout.exercises.every(exercise => exercise.selected)) ? 'exercise-selected' : 'exercise-name'} text-center my-auto`}
        onClick={select}
      >
        {workout.name} {workout.exercises.every(exercise => exercise.selected) ? <span className="ml-1"><em>(selected)</em></span> : null}
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