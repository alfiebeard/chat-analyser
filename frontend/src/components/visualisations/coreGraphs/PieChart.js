import React, {useState, useEffect} from 'react';
import {Chart as Chartjs} from 'chart.js/auto';
import {Chart} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import { setGraphData, setOptions } from './utils';
import NoDataChart from './NoDataChart';


const PieChart = (props) => {
  return (
    <>
      {props.data ? 
        <Pie
          data={setGraphData(props.data, props.x, props.y, props.label, props.data[props.x].length)}
          options={setOptions({"title": props.title, "xTitle": props.xTitle, "yTitle": props.yTitle, "showLegend": false, "showAxes": false})}
        />
        :
        <NoDataChart 
          error={props.error}
        />
      }
    </>
  );
}

export default PieChart;