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
      {typeof props.setStartXIndex !== 'undefined' && typeof props.setEndXIndex !== 'undefined' ?
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
        : null
      }

      {typeof props.xScale !== 'undefined' && typeof props.changeXScale !== 'undefined' && 
        typeof props.xScaleOptions !== 'undefined' ?
        <div className={"chartControlGroup"}>
          <Form.Label className={"chartControlGroupItem"}>
            Period
          </Form.Label>
          <Form.Select
            className={"chartControlGroupItem chartControlSelect"}
            value={props.xScale}
            onChange={props.changeXScale}
            size={"sm"}
          >
            {Object.keys(props.xScaleOptions).map((option) => 
              <option key={option} value={option}>{props.xScaleOptions[option]}</option>
            )}
          </Form.Select>
        </div>
        : null
      }

      {typeof props.rescale !== 'undefined' && typeof props.changeRescale !== 'undefined' ?
        <Form.Switch
          className={"chartControl chartControlSwitch"}
          checked={!props.rescale}
          onChange={props.changeRescale}
          label={"Rescale axis"}
        />
        : null
      }

      {typeof props.combineStacked !== 'undefined' && typeof props.changeCombineStacked !== 'undefined' ?
        <Form.Switch
          className={"chartControl chartControlSwitch"}
          checked={!props.combineStacked}
          onChange={props.changeCombineStacked}
          label={"Split by user"}
        />
        : null
      }

      {typeof props.selectDeselectAll !== 'undefined' ?
        <Button 
          className={"chartControl chartControlButton"} 
          size={"sm"}
          variant={"light"}
          onClick={props.selectDeselectAll}
        >
          Select/Deselect all
        </Button>
        : null
      }
    </Row>
  );
}

export default ChartControls;