import React, {useState, useEffect} from 'react';
import '../../app/App.css';
import { fetchTotalMessagesUsers } from '../../../api/api';
import PieChart from '../coreGraphs/PieChart';


const TotalMessagesUsersGraph = (props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchTotalMessagesUsers(setData, setError);
  }, []);

  return (
    <div className={"block"}>
      <PieChart
        title={"User Messages Sent"}
        data={data}
        x={'users'}
        y={'total_messages'}
        label={"User Total Messages"}
        error={error}
      />
    </div>
  );
}

export default TotalMessagesUsersGraph;