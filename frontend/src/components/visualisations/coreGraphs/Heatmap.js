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

      if (chart._metasets[0].data.length === 0) return;    // If no data - don't draw ticks
      const barWidth = chart._metasets[0].data[0].width;
      
      // loop through ticks array
      // for (var tick = 0; tick < numTicks; tick++){
      xAxis.ticks.forEach((tick, index) => {
        if (index === xAxis.ticks.length - 1) return;
        
        // Tick constants
        const tickHeight = 8;
        const tickLineWidth = 1;
        const tickColor = Chart.defaults.borderColor;
        const textBaseline = 'middle';
        const textAlign = 'center';
        const textColor = '#666';
        const textYPadding = 33;

        // If tick is an integer and exists in data - draw it and add label - can only be integer
        if (Number.isInteger(tick.value) && tick.value < chart.data.datasets[0].data.length) {
          // Tick position - shifted to center of bar
          const xPos = xAxis.getPixelForTick(index) + barWidth / 2;

          // Draw tick
          ctx.beginPath();
          ctx.lineWidth = tickLineWidth;
          ctx.strokeStyle = tickColor
          ctx.moveTo(xPos, chart.chartArea.bottom);
          ctx.lineTo(xPos, chart.chartArea.bottom + tickHeight);
          ctx.stroke();
          ctx.closePath();

          // Draw tick label
          var yPos = xAxis.bottom;
          var yPadding = textYPadding;
          ctx.save();
          ctx.textBaseline = textBaseline;
          ctx.textAlign = textAlign;
          ctx.fillStyle = textColor;
          const tickText = chart.data.datasets[0].data[tick.value].d;
          ctx.fillText(tickText, xPos, yPos - yPadding);
          ctx.restore();
        }
      })
    }
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
              data={setHeatmapData(filterDataByX(props.data.data, props.x, props.y, startXIndex, endXIndex, props.stackable), props.x, props.y, props.color)}
              options={setHeatmapOptions({"title": props.title, "xTitle": props.xTitle, "yTitle": props.yTitle, "maxX": endXIndex - startXIndex + 1})}
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