import React, {useState, useEffect} from 'react';
import '../../app/App.css';
import { fetchMessagesOverTime } from '../../../api/api.js';
import BarChart from '../coreGraphs/BarChart.js';


const MessagesOverTimeGraph = (props) => {
  const [data, setData] = useState(null);   // Chart data and metadata in an object like {"data": {...}, "metadata": {...}}
  const [error, setError] = useState(false);  // Any errors from fetching the data - displayed in no chart data component.

  useEffect(() => {
    // Fetch the data on load and automatically select the sensible x range, as determined by the backend.
    fetchMessagesOverTime(setData, setError, "auto", props.splitByUser);
  }, []);

  const updateData = (e) => {
    // Update the data with the specified xScale - in this case time interval, e.g., months, years, etc..
    fetchMessagesOverTime(setData, setError, e.target.value, props.splitByUser);
  }

  return (
    <div className={"block"}>
      <BarChart
        title={"Total Messages Sent"}
        x={'datetime'}
        y={'content'}
        label={"Total Messages"}
        xTitle={data ? data.metadata.x_scale_options[data.metadata.x_scale] : ""}
        yTitle={"Messages"}
        color={'rgb(75, 192, 192)'}
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

export default MessagesOverTimeGraph;