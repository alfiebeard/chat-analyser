import React, {useState, useEffect} from 'react';
import '../../App.css';
import {Chart as Chartjs} from 'chart.js/auto';
import {Chart} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import { setGraphData, setOptions } from './utils';


const PieChart = (props) => {
  return (
    <>
      {props.x && props.y ? 
        <Pie
          data={setGraphData(props.x, props.y, props.label, props.x.length)}
          options={setOptions(props.title, props.xTitle, props.yTitle, false, false)}
        />
        :
        null
      }
    </>
  );
}

export default PieChart;