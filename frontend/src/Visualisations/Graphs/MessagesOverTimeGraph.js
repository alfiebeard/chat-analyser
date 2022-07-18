import React, {useState, useEffect} from 'react';
import '../../App.css';
import { fetchMessagesOverTime } from '../../api/api';
import messagesOverTimeSample from '../../TestData/messagesOverTimeSample.json';
import BarChart from '../BaseGraphs/BarChart';


const MessagesOverTimeGraph = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {if (props.dataLoaded) {
    // fetchMessagesOverTime('auto');
    setData(messagesOverTimeSample);
  }}, [props.dataLoaded]);

  return (
    <div className={"block"}>
      {data ?
        <BarChart
          title={"Total Messages Sent"}
          x={data['datetime']}
          y={data['content']}
          label={"Total Messages"}
          xTitle={"Month"}
          yTitle={"Messages"}
          color={'rgb(75, 192, 192)'}
        />
        :
        <div>No data to display</div>
      }
    </div>
  );
}

export default MessagesOverTimeGraph;