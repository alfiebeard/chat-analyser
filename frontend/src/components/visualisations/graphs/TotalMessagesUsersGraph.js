import React, {useState, useEffect} from 'react';
import '../../app/App.css';
import { fetchTotalMessagesUsers } from '../../../api/api';
import totalMessagesUserSample from '../../../TestData/totalMessagesUserSample.json';
import PieChart from '../coreGraphs/PieChart';


const TotalMessagesUsersGraph = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {if (props.dataLoaded) {
    // fetchTotalMessagesUsers();
    setData(totalMessagesUserSample);
  }}, [props.dataLoaded]);

  return (
    <div className={"block"}>
      {data ?
        <PieChart
          title={"User Messages Sent"}
          x={data['users']}
          y={data['total_messages']}
          label={"User Total Messages"}
        />
        :
        <div>No data to display</div>
      }
    </div>
  );
}

export default TotalMessagesUsersGraph;