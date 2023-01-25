import React, {useState, useEffect} from 'react';
import '../../app/App.css';
import { fetchMessageLengthsByTime } from '../../../api/api.js';
import RadarChart from '../coreGraphs/RadarChart.js';


const MessageLengthsByTimeGraph = (props) => {
  const [data, setData] = useState(null);   // Chart data and metadata in an object like {"data": {...}, "metadata": {...}}
  const [error, setError] = useState(false);  // Any errors from fetching the data - displayed in no chart data component.

  useEffect(() => {
    // Fetch the data on load and automatically select the sensible x range, as determined by the backend.
    fetchMessageLengthsByTime(setData, setError, "auto", props.splitByUser);
  }, []);

  const updateData = (e) => {
    // Update the data with the specified xScale - in this case time interval, e.g., months, years, etc..
    fetchMessageLengthsByTime(setData, setError, e.target.value, props.splitByUser);
  }

  return (
    <div className={"block"}>
      <RadarChart
        title={"Average Message Lengths by Time"}
        x={'datetime'}
        y={'content_length'}
        label={"Average Message Length"}
        xTitle={data ? data.metadata.x_scale_options[data.metadata.x_scale] : ""}
        yTitle={"Messages"}
        color={'rgba(80, 255, 140, 0.6)'}
        height={props.chartHeight}
        data={data}
        updateData={updateData}
        stackable={props.splitByUser}
        error={error}
        showControls={props.showControls}
        aggregation={"mean"}
      />
    </div>
  );
}

export default MessageLengthsByTimeGraph;