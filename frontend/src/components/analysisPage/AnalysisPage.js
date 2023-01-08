import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import TopWordsGraph from '../visualisations/graphs/TopWordsGraph';
import MessagesOverTimeGraph from '../visualisations/graphs/MessagesOverTimeGraph';


const AnalysisPage = (props) => {
	// const [numCols, setNumCols] = useState(1);
	// const [allVisualisations, setAllVisualisations] = ["TopWordsGraph"]
	// const [visualisations, setVisualisations] = allVisualisations

  return (
    <>
      {props.display ? 
        <div className={"p-2"}>
			<Row className={"w-100 m-0"}>
				<Col lg={8} className={"h-100 p-2"}>
					<MessagesOverTimeGraph splitByUser={true} />
				</Col>
				<Col lg={4} className={"h-100 p-2"}>
					<TopWordsGraph />
				</Col>
			</Row>
        </div>
      : null
      }
      </>
  );
}

// {splitArrayIntoColumns(props.additionalParameters, numCols).map((parameters) => (
// 	<Row key={"row" + parameters[0].name}>
// 		{parameters.map((parameter) => (
// 			<Col lg={parameters.length == numCols ? 12 / numCols : 12} key={parameter.name}>
// 				<Form.Group className="mb-2">
// 					<Form.Label>{parameter.label}</Form.Label>
// 						<Form.Control type={parameter.type} name={parameter.name} value={props.strategyForm[parameter.name]} onChange={(e) => {props.handleChange(e)}} required />
// 				</Form.Group>
// 			</Col>
// 		))}
// 	</Row>
// ))}

// export function splitArrayIntoColumns(array, numCols=2) {
// 	// Split an array of objects across numCols columns, e.g., if 5 items, split into 3 and 2.
// 	// array = [{"default": 4, "label": "V Threshold", "name": "velocity_threshold", "type": "number"}, 
// 	// {"default": 0.01,"label": "P Threshold", "name": "power_threshold", "type": "number"}]
// 	// Returns [[{"default": 4, "label": "V Threshold", "name": "velocity_threshold", "type": "number"},
// 	//           {"default": 0.01, "label": "P Threshold", "name": "power_threshold", "type": "number"}]]
// 	var splitArray = []
// 	for (let i = 0; i < array.length; i += numCols) {
// 			splitArray.push(array.slice(i, i + numCols));
// 	}
// 	return splitArray
// }

export default AnalysisPage;