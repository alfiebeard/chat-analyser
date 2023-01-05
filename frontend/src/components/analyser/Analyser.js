import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import MessagesOverTimeGraph from '../visualisations/graphs/MessagesOverTimeGraph.js';
import TopWordsGraph from '../visualisations/graphs/TopWordsGraph.js';
import TotalMessagesUsers from '../visualisations/graphs/TotalMessagesUsersGraph.js';
import './Analyser.css';
import GeneralStatistics from '../information/GeneralStatistics.js';
import MiniMessengerView from '../messenger/MiniMessengerView.js';


const Analyser = (props) => {
  return (
    <>
      {props.display ? 
        <div className={"content p-2"}>
          <Row className={"h-50 w-100 m-0"}>
            <Col lg={4} className={"h-100 p-2"}>
              <GeneralStatistics dataLoaded={props.dataLoaded} />
            </Col>
            <Col lg={8} className={"h-100 p-2"}>
              <TopWordsGraph dataLoaded={props.dataLoaded} />
            </Col>
          </Row>
          <Row className={"h-50 w-100 m-0"}>
            <Col lg={4} className={"h-100 p-2"}>
              <MessagesOverTimeGraph dataLoaded={props.dataLoaded} />
            </Col>
            <Col lg={4} className={"h-100 p-2"}>
              <TotalMessagesUsers dataLoaded={props.dataLoaded} />
            </Col>
            <Col lg={4} className={"h-100 p-2"}>
              <MiniMessengerView dataLoaded={props.dataLoaded} />
            </Col>
          </Row>
        </div>
      : null
      }
      </>
  );
}

export default Analyser;