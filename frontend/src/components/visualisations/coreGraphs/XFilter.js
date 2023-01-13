import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';


const XFilter = (props) => {
  // Displays the x filter chart control.

  return (
    <div className={"chartControlGroup"}>
        <Form.Select
          className={"chartControlGroupItem chartControlSelect"}
          value={props.startXIndex}
          onChange={(e) => props.setStartXIndex(e.target.value)}
          size={"sm"}
        >
          {Object.keys(props.dataX).map((option, index) => (
            index < props.endXIndex ? <option key={option} value={option}>{props.dataX[option]}</option> : null
          ))}
        </Form.Select>

        <span className={"m-auto p-1"}> &lt; {props.name} &lt; </span>

        <Form.Select
          className={"chartControlGroupItem chartControlSelect"}
          value={props.endXIndex}
          onChange={(e) => props.setEndXIndex(e.target.value)}
          size={"sm"}
        >
          {Object.keys(props.dataX).map((option, index) => (
            index > props.startXIndex ? <option key={option} value={option}>{props.dataX[option]}</option> : null
          ))}
        </Form.Select>
    </div>
  );
}

export default XFilter;