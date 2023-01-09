import React, {useState, useEffect, useRef} from 'react';
import {Chart as Chartjs} from 'chart.js/auto';
import {Chart} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import { Button } from 'react-bootstrap';

import { setGraphData, setOptions } from './utils';

import NoDataChart from './NoDataChart';
import ChartControls from './ChartControls';

import "./Chart.css";


const BarChart = (props) => {
  const controlsHeight = 50;
  const [displayControls, setDisplayControls] = useState(false);

  const chartRef = useRef(null);

  const selectDeselectAll = () => {
    chartRef.current.data.datasets.forEach(function(ds) {
      ds.hidden = !ds.hidden;
    });
    chartRef.current.update();
  }

  return (
    <>
      {props.data ? 
        <>
          {props.showControls ? 
            <div className={"chartControlsToggleButtonContainer"}>
              <Button className={"chartControlsToggleButton"} onClick={() => {setDisplayControls(!displayControls)}}>
                Controls
              </Button>
            </div>
            : null
          }

          <div style={{"height": props.height !== undefined ? props.height - controlsHeight : "100%"}}>
            <Bar
              ref={chartRef}
              data={setGraphData(props.data, props.x, props.y, props.label, props.color, props.stacked)}
              options={setOptions(props.title, props.xTitle, props.yTitle, props.stacked)}
            />
          </div>

          {props.showControls ? 
            <div style={{"display": displayControls ? "block" : "none", "height": controlsHeight}}>
              <ChartControls
                selectDeselectAll={selectDeselectAll} 
              />
            </div>
            : null
          }
        </>
        :
        <NoDataChart 
          error={props.error}
        />
      }
    </>
  );
}

export default BarChart;