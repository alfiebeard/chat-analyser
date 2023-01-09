import React, {useState, useEffect} from 'react';
import '../app/App.css';
import { fetchNthMessages } from '../../api/api';
import nthMessagesSample from '../../TestData/nthMessagesSample.json';
import Message from './Message';
import NoDataChart from '../visualisations/coreGraphs/NoDataChart';


const MiniMessengerView = (props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchNthMessages(setData, setError, 0, 10);
  }, []);

  return (
    <div className={"block"}>
      {data ? data.map((message) =>
        <Message
          key={message.id}
          message={message} 
        />
      )
      : 
      <NoDataChart
        error={error}
      />
    }
    </div>
  );
}

export default MiniMessengerView;