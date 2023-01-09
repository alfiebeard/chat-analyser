import React, {useState, useEffect} from 'react';
import '../../app/App.css';
import {Chart as Chartjs} from 'chart.js/auto';
import {Chart} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import { setGraphData, setOptions } from './utils';
import SyncLoader from 'react-spinners/SyncLoader';

import "./NoDataChart.css";


const NoDataChart = (props) => {
  return (
    <>
      {!props.error ? 
        <div className={"waitingForApiSpinner"}>
          <SyncLoader />
        </div>
        :
        "Error"
      }
    </>
  );
}

export default NoDataChart;