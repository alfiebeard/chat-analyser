import React, {useState, useEffect} from 'react';
import '../app/App.css';
import { fetchNthMessages } from '../../api/api';
import nthMessagesSample from '../../TestData/nthMessagesSample.json';
import Message from './Message';


const MiniMessengerView = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchNthMessages(0, 10);
    setData(nthMessagesSample["messages"]);
  }, []);

  return (
    <div className={"block"}>
      {data ? data.map((message) =>
        <Message
          key={message.id}
          message={message} 
        />
      )
      : null
    }
    </div>
  );
}

export default MiniMessengerView;