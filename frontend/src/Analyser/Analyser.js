import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import MessagesOverTimeGraph from '../Visualisations/Graphs/MessagesOverTimeGraph';
import TopWordsGraph from '../Visualisations/Graphs/TopWordsGraph';
import TotalMessagesUsers from '../Visualisations/Graphs/TotalMessagesUsersGraph';
import '../App.css';
import GeneralStatistics from './GeneralStatistics';
import MiniMessengerView from './MiniMessengerView';
import { clearData } from '../api/api';


const Analyser = (props) => {
  return (
    // <button onClick={() => {clearData(props.setDataLoaded)}}>Clear Data</button>
    <>
      {props.display ? 
        <>
          <div className={"title"}>
            Analyser
          </div>
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
        </>
      : null
      }
      </>
  );
}

export default Analyser;