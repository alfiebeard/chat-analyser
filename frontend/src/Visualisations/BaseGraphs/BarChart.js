import React, {useState, useEffect} from 'react';
import '../../App.css';
import {Chart as Chartjs} from 'chart.js/auto';
import {Chart} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import { setGraphData, setOptions } from './utils';


const BarChart = (props) => {
  return (
    <>
      {props.x && props.y ? 
        <Bar
          data={setGraphData(props.x, props.y, props.label, props.color)}
          options={setOptions(props.title, props.xTitle, props.yTitle)}
        />
        :
        null
      }
    </>
  );
}

export default BarChart;