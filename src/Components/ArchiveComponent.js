import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

export default function Archive({ log, archive, setArchive }) {

  function formatLog() {
    const trashcan = (
      <i onClick={deleteArchive} className="exercise-option fa fa-lg fa-trash"></i>
    );

    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let rawDate = new Date(log.date);
    let month = rawDate.getMonth();
    let day = rawDate.getDate();
    let year = rawDate.getFullYear();
    let weekDay = week[rawDate.getDay()];
    let date = `${weekDay}, ${month + 1} / ${day} / ${year}`;

    let weightIfUpdated = (log.userWeight) ? (log.userWeight.systemIsMetric) ? `Weighed in at ${log.userWeight.weight} kgs` : `Weighed in at ${log.userWeight.weight} lbs` : null;

    let details = log.exerciseDetails.map(detail => {
      let exercise = Object.keys(detail);
      let detailType = Object.keys(detail[Object.keys(detail)]);
      let detailTypeVal = detailType.map(key => detail[Object.keys(detail)][key]);
      let formattedDetails = (
        <Col sm="1">
          <span className="title">{exercise}</span><br />

          {detailType.map(type => {
            let connectingIndex = detailType.indexOf(type);
            return (
              <>
                {detailType[connectingIndex]}: {detailTypeVal[connectingIndex]}<br />
              </>
            );
          })}

        </Col>
      );
      return formattedDetails
    })

    let comments = log.comments;

    return (
      <>
        <Col xs="2" sm="1" className="my-auto">
          {trashcan}
        </Col>
        <Col>
          <span className="title"><em><b>{date}</b></em></span> <br />
          <Row className="archive-data-container">
            {details}
            <Col>
              <span className="title">Comments<br /></span> {comments}
            </Col>
            <Col className="title my-auto">
              {weightIfUpdated}
            </Col>
          </Row>
        </Col>
      </>
    );

  }

  function deleteArchive() {
    try {
      fetch(baseUrl + 'archive/' + log._id, {
        method: 'DELETE',
        credentials: 'include',
        header: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          setArchive(archive.filter(log => log._id !== res._id));
        })
    }
    catch (err) {
      console.log(err);
    }
  }

  return formatLog();
}