import React, {useState, useEffect} from 'react';
import '../../app/App.css';
import { fetchMessagesOverTime } from '../../../api/api.js';
import Heatmap from '../coreGraphs/Heatmap';


const MessagesHeatmap = (props) => {
  const [data, setData] = useState(null);   // Chart data and metadata in an object like {"data": {...}, "metadata": {...}}
  const [error, setError] = useState(false);  // Any errors from fetching the data - displayed in no chart data component.

  useEffect(() => {
    // Fetch the data on load and automatically select the sensible x range for a heatmap, as determined by the backend.
    fetchMessagesOverTime(setData, setError, "heatmap", true);
  }, []);

  const updateData = (e) => {
    // Update the data with the specified xScale - in this case time interval, e.g., months, years, etc..
    fetchMessagesOverTime(setData, setError, e.target.value, true);
  }

  return (
    <div className={"block"}>
      <Heatmap
        title={"Messages Heatmap"}
        x={'datetime'}
        y={'content'}
        xTitle={data ? data.metadata.x_scale_options[data.metadata.x_scale] : ""}
        yTitle={"User"}
        color={'YlGn'}
        height={props.chartHeight}
        data={data}
        updateData={updateData}
        stackable={true}
        error={error}
        showControls={props.showControls}
      />
    </div>
  );
}

export default MessagesHeatmap;