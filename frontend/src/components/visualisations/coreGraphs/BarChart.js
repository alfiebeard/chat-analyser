import React, {useState, useEffect} from 'react';
import '../../app/App.css';
import {Chart as Chartjs} from 'chart.js/auto';
import {Chart} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import { setGraphData, setOptions } from './utils';


const BarChart = (props) => {
  return (
    <>
      {props.data ? 
        <Bar
          data={setGraphData(props.data, props.x, props.y, props.label, props.color, props.stacked)}
          options={setOptions(props.title, props.xTitle, props.yTitle, props.stacked)}
        />
        :
        null
      }
    </>
  );
}

export default BarChart;