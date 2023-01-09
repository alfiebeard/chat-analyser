import React, {useState, useEffect} from 'react';
import '../../app/App.css';
import { fetchMessagesOverTime } from '../../../api/api.js';
import BarChart from '../coreGraphs/BarChart.js';


const MessagesOverTimeGraph = (props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [period, setPeriod] = useState('auto')

  useEffect(() => {
    fetchMessagesOverTime(setData, setError, period, props.splitByUser);
  }, []);

  return (
    <div className={"block"}>
      <BarChart
        title={"Total Messages Sent"}
        x={'datetime'}
        y={'content'}
        data={data}
        stacked={props.splitByUser}
        label={"Total Messages"}
        xTitle={"Month"}
        yTitle={"Messages"}
        color={'rgb(75, 192, 192)'}
        error={error}
        showControls={props.showControls}
        height={props.chartHeight}
      />
    </div>
  );
}

export default MessagesOverTimeGraph;