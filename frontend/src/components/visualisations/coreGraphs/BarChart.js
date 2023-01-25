import React, {useState, useEffect, useRef} from 'react';
import {Chart as Chartjs} from 'chart.js/auto';
import {Chart} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

import { setGraphData, setOptions, getDataX, filterDataByX } from './utils';

import NoDataChart from './NoDataChart';
import ChartControls from './ChartControls';

import "./Chart.css";


const BarChart = (props) => {
  const [displayControls, setDisplayControls] = useState(false);    // Whether to display the chart controls or not
  const [rescale, setRescale] = useState(null);   // Null if to automatically rescale, float representing max y value if fixed.
  const [combineStacked, setCombineStacked] = useState(false);  // Whether to combined a stackable chart into one bar or not.
  const [startXIndex, setStartXIndex] = useState(0);    // Current start index in x for filtering
  const [endXIndex, setEndXIndex] = useState(0);    // Current end index in x for filtering
  const [minXIndex, setMinXIndex] = useState(0);    // Min possible index in x for filtering
  const [maxXIndex, setMaxXIndex] = useState(0);    // Max possible index in x for filtering

  const chartRef = useRef(null);

  useEffect(() => {
    // If there is data get the min/max indices from the x scale - this is for filtering.
    if (props.data) {
      const dataX = getDataX(props.data.data, props.x, props.stackable);
      setStartXIndex(0);
      setMinXIndex(0);
      setEndXIndex(dataX.length - 1);
      setMaxXIndex(dataX.length - 1);
    }
  }, [props.data])

  const selectDeselectAll = () => {
    // Select/deselect all datasets in a chart
    chartRef.current._metasets.forEach(function(ds) {
      ds.hidden = !ds.hidden || null
    });
    chartRef.current.update();
  }

  const changeRescale = () => {
    // Change whether a chart rescales the y axis or whether it is fixed in place at the max. 
    if (!rescale) {
      // If not rescaling - fix rescale value to the max y value on axis, else set to null.
      setRescale(chartRef.current.scales.y.end)
    }
    else {
      setRescale(null)
    }
  }

  const changeCombineStacked = () => {
    // Change whether a stackable chart is combined into one bar or displayed as a stacked bar chart.
    if (!combineStacked) {
      // If not combining - combine all the dataset into one dataset, else use stacked version.
      setCombineStacked(!combineStacked);
    }
    else {
      setCombineStacked(!combineStacked);
    }
  }

  return (
    <>
      {/* If there is data show the data on a chart, otherwise show the no data chart */}
      {props.data ? 
        <>
          {props.showControls ? 
            <div className={"chartControlsToggleButtonContainer"}>
              <Button className={"chartControlsToggleButton btn-light"} onClick={() => {setDisplayControls(!displayControls)}}>
                Controls
              </Button>
            </div>
            : null
          }

          <div style={{"height": props.height !== undefined ? props.height : "100%"}}>
            <Bar
              ref={chartRef}
              data={setGraphData(filterDataByX(props.data.data, props.x, props.y, startXIndex, endXIndex, props.stackable), props.x, props.y, props.label, props.color, {"stackable": props.stackable, "displayStacked": !combineStacked})}
              options={setOptions({"title": props.title, "xTitle": props.xTitle, "yTitle": props.yTitle, "stackable": props.stackable, "maxY": rescale})}
            />
          </div>

          {props.showControls ? 
            <ChartControls
              displayControls={displayControls}
              selectDeselectAll={selectDeselectAll} 
              rescale={rescale}
              changeRescale={changeRescale}
              combineStacked={combineStacked}
              changeCombineStacked={changeCombineStacked}
              xScale={props.data.metadata.x_scale}
              xScaleOptions={props.data.metadata.x_scale_options}
              changeXScale={props.updateData}
              xTitle={props.xTitle}
              dataX={getDataX(props.data.data, props.x, props.stackable)}
              minXIndex={minXIndex}
              startXIndex={startXIndex}
              setStartXIndex={setStartXIndex}
              maxXIndex={maxXIndex}
              endXIndex={endXIndex}
              setEndXIndex={setEndXIndex}
            />
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