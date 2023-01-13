import React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import XFilter from './XFilter';


const ChartControls = (props) => {
  // Displays the chart controls and all possible options.

  return (
    <Row className={"w-100 chartControls"} style={{"display": props.displayControls ? "flex" : "none"}}>
      <XFilter
        name={props.xTitle}
        dataX={props.dataX}
        startXIndex={props.startXIndex}
        setStartXIndex={props.setStartXIndex}
        minXIndex={props.minXIndex}
        endXIndex={props.endXIndex}
        setEndXIndex={props.setEndXIndex}
        maxXIndex={props.maxXIndex}
      />

      <div className={"chartControlGroup"}>
        <Form.Label className={"chartControlGroupItem"}>
          Period
        </Form.Label>
        <Form.Select
          className={"chartControlGroupItem chartControlSelect"}
          selected={props.xScale}
          onChange={props.changeXScale}
          size={"sm"}
        >
          {Object.keys(props.xScaleOptions).map((option) => 
            <option key={option} value={option}>{props.xScaleOptions[option]}</option>
          )}
        </Form.Select>
      </div>

      <Form.Switch
        className={"chartControl chartControlSwitch"}
        checked={!props.rescale}
        onChange={props.changeRescale}
        label={"Rescale axis"}
      />

      <Form.Switch
        className={"chartControl chartControlSwitch"}
        checked={!props.combineStacked}
        onChange={props.changeCombineStacked}
        label={"Split by user"}
      />

      <Button 
        className={"chartControl chartControlButton"} 
        size={"sm"}
        variant={"light"}
        onClick={props.selectDeselectAll}
      >
        Select/Deselect all
      </Button>
    </Row>
  );
}

export default ChartControls;