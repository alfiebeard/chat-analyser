import React, {useState, useEffect} from 'react';
import '../app/App.css';
import { fetchGeneralStatistics } from '../../api/api';
import { convertSeconds } from '../../utils/timeUtils';
import generalStatsSample from '../../TestData/generalStatsSample.json';


const GeneralStatistics = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {if (props.dataLoaded) {
    fetchGeneralStatistics();
    setData(generalStatsSample);
  }}, [props.dataLoaded]);

  return (
    <div className={"block"}>
      <div className={"block-title"}>
        General
      </div>
      {data ? 
        <div>
          <div><b>Total messages sent:</b> {data.total_messages}</div>
          <div><b>Dates:</b> {data.start_date}-{data.end_date}</div>
          <div><b>Current Users:</b> {data.users.join(', ')}</div>
          <div><b>Total photos:</b> {data.total_photos}</div>
          <div><b>Total videos:</b> {data.total_videos}</div>
          <div><b>Total calls:</b> {data.total_calls}</div>
          <div><b>Average messages per day:</b> {Math.round((data.total_messages / (data.total_time / 86400)) * 100) / 100}</div>
          <div><b>Average message length:</b> {Math.round(data.mean_message_length * 100) / 100}</div>
          <div><b>Longest silence:</b> {convertSeconds(data.longest_silence)}</div>
        </div>
        :
        "No data"
      }
    </div>
  );
}

export default GeneralStatistics;