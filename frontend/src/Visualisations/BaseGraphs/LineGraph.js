import React, {useState, useEffect} from 'react';
import '../../App.css';
import {Chart as Chartjs} from 'chart.js/auto';
import {Chart} from 'chart.js';
import {Line} from 'react-chartjs-2';
import { setGraphData, setOptions } from './utils';


const LineGraph = (props) => {

  return (
    <div>
      {props.x && props.y ? 
        <Line
          data={setGraphData(props.x, props.y, props.label, props.color)}
          options={setOptions(props.title, props.xTitle, props.yTitle)}
        />
        :
        null
      }
    </div>
  );
}

export default LineGraph;