import React, {useState, useEffect} from 'react';
import '../../app/App.css';
import {Chart as Chartjs} from 'chart.js/auto';
import {Chart} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import { setGraphData, setOptions } from './utils';


const PieChart = (props) => {
  return (
    <>
      {props.data ? 
        <Pie
          data={setGraphData(props.data, props.x, props.y, props.label, props.x.length)}
          options={setOptions(props.title, props.xTitle, props.yTitle, false, false, false)}
        />
        :
        null
      }
    </>
  );
}

export default PieChart;