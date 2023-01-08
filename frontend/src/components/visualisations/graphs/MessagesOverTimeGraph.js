import React, {useState, useEffect} from 'react';
import '../../app/App.css';
import { fetchMessagesOverTime } from '../../../api/api.js';
import messagesOverTimeUserSample from '../../../TestData/messagesOverTimeUserSample.json';
import BarChart from '../coreGraphs/BarChart.js';


const MessagesOverTimeGraph = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchMessagesOverTime('auto', props.splitByUser);
    setData(messagesOverTimeUserSample);
  }, []);

  return (
    <div className={"block"}>
      {data ?
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
        />
        :
        <div>No data to display</div>
      }
    </div>
  );
}

export default MessagesOverTimeGraph;