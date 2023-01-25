import React, {useState, useEffect} from 'react';
import '../../app/App.css';
import { fetchMessageLengthsOverTime } from '../../../api/api.js';
import LineChart from '../coreGraphs/LineChart.js';
import Heatmap from '../coreGraphs/Heatmap';


const MessageLengthsOverTimeGraph = (props) => {
  const [data, setData] = useState(null);   // Chart data and metadata in an object like {"data": {...}, "metadata": {...}}
  const [error, setError] = useState(false);  // Any errors from fetching the data - displayed in no chart data component.

  useEffect(() => {
    // Fetch the data on load and automatically select the sensible x range, as determined by the backend.
    fetchMessageLengthsOverTime(setData, setError, "auto", props.splitByUser);
  }, []);

  const updateData = (e) => {
    // Update the data with the specified xScale - in this case time interval, e.g., months, years, etc..
    fetchMessageLengthsOverTime(setData, setError, e.target.value, props.splitByUser);
  }

  return (
    <div className={"block"}>
      <Heatmap
        title={"Message Lengths Over Time"}
        x={'datetime'}
        y={'content_length'}
        label={"Message Lengths"}
        xTitle={data ? data.metadata.x_scale_options[data.metadata.x_scale] : ""}
        yTitle={"Messages"}
        color={'BuGn'}
        height={props.chartHeight}
        data={data}
        updateData={updateData}
        stackable={props.splitByUser}
        error={error}
        showControls={props.showControls}
      />
    </div>
  );
}

export default MessageLengthsOverTimeGraph;