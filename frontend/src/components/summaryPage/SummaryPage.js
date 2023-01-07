import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import MessagesOverTimeGraph from '../visualisations/graphs/MessagesOverTimeGraph.js';
import TopWordsGraph from '../visualisations/graphs/TopWordsGraph.js';
import TotalMessagesUsers from '../visualisations/graphs/TotalMessagesUsersGraph.js';
import './SummaryPage.css';
import GeneralStatistics from '../information/GeneralStatistics.js';
import MiniMessengerView from '../messenger/MiniMessengerView.js';


const SummaryPage = (props) => {
  return (
    <>
      {props.display ? 
        <div className={"content p-2"}>
          <Row className={"h-50 w-100 m-0"}>
            <Col lg={4} className={"h-100 p-2"}>
              <GeneralStatistics />
            </Col>
            <Col lg={8} className={"h-100 p-2"}>
              <TopWordsGraph />
            </Col>
          </Row>
          <Row className={"h-50 w-100 m-0"}>
            <Col lg={4} className={"h-100 p-2"}>
              <MessagesOverTimeGraph />
            </Col>
            <Col lg={4} className={"h-100 p-2"}>
              <TotalMessagesUsers />
            </Col>
            <Col lg={4} className={"h-100 p-2"}>
              <MiniMessengerView />
            </Col>
          </Row>
        </div>
      : null
      }
      </>
  );
}

export default SummaryPage;