import React, {useState, useEffect, useRef} from 'react';
import {Chart as Chartjs} from 'chart.js/auto';
import {Chart} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import { Button } from 'react-bootstrap';

import { setHeatmapData, setHeatmapOptions, getDataX, filterDataByX, heatmapMaxDataX } from './utils';

import NoDataChart from './NoDataChart';
import ChartControls from './ChartControls';

import "./Chart.css";


const Heatmap = (props) => {
  const [displayControls, setDisplayControls] = useState(false);    // Whether to display the chart controls or not
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

  const plugins = [
    {
      beforeDraw: function(chart) {
        var legends = chart.legend.legendItems;
        legends.forEach(function(e) {
            e.fillStyle = Chart.defaults.borderColor;
        });
      },
      afterDraw: function(chart) {
      var ctx = chart.ctx;
      var xAxis = chart.scales['x'];
      const barWidth = chart._metasets[0].data[0].width;
      console.log(xAxis.ticks);
      // loop through ticks array
      xAxis.ticks.forEach((tick, index) => {
        if (index === xAxis.ticks.length - 1) return;
        const xPos = xAxis.getPixelForTick(index);
        const newXPos = xPos + barWidth / 2

        // Draw tick line
        const tickHeight = 8;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = Chart.defaults.borderColor;
        ctx.moveTo(newXPos, chart.chartArea.bottom);
        ctx.lineTo(newXPos, chart.chartArea.bottom + tickHeight);
        ctx.stroke();
        ctx.closePath();

        // Draw tick label
        var yPos = xAxis.bottom;
        var yPadding = 33;
        ctx.save();
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#666';
        // Fill with the data from the chart, i.e., the date ('d')
        var tickText = chart.data.datasets[0].data[0].d
        // If tick exists show it
        if (tick.value < chart.data.datasets[0].data.length) {
          tickText = chart.data.datasets[0].data[tick.value].d;
        }
        ctx.fillText(tickText, newXPos, yPos - yPadding);
        ctx.restore();
      });}
    }
  ]

  const selectDeselectAll = () => {
    // Select/deselect all datasets in a chart
    chartRef.current._metasets.forEach(function(ds) {
      ds.hidden = !ds.hidden || null
    });
    chartRef.current.update();
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
              data={setHeatmapData(filterDataByX(props.data.data, props.x, props.y, startXIndex, endXIndex, props.stackable), props.x, props.y)}
              options={setHeatmapOptions({"title": props.title, "xTitle": props.xTitle, "yTitle": props.yTitle, "maxX": heatmapMaxDataX(props.data.data, props.x)})}
              plugins={plugins}
            />
          </div>

          {props.showControls ? 
            <ChartControls
              displayControls={displayControls}
              selectDeselectAll={selectDeselectAll} 
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

export default Heatmap;