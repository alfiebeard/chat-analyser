import React, {useState, useEffect} from 'react';
import {Chart as Chartjs} from 'chart.js/auto';
import {Chart} from 'chart.js';
import {Line} from 'react-chartjs-2';
import { setGraphData, setOptions } from './utils';
import NoDataChart from './NoDataChart';


const LineGraph = (props) => {

  return (
    <div>
      {props.data ? 
        <Line
          data={setGraphData(props.data, props.x, props.y, props.label, props.color)}
          options={setOptions({"title": props.title, "xTitle": props.xTitle, "yTitle": props.yTitle})}
        />
        :
        <NoDataChart 
          error={props.error}
        />
      }
    </div>
  );
}

export default LineGraph;