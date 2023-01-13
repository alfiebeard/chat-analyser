import React, {useState, useEffect} from 'react';
import '../app/App.css';
import { fetchGeneralStatistics } from '../../api/api';
import { convertSeconds } from '../../utils/timeUtils';
import NoDataChart from '../visualisations/coreGraphs/NoDataChart';


const GeneralStatistics = (props) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchGeneralStatistics(setData, setError);
  }, []);

  return (
    <div className={"block"}>
      {data ? 
        <>
          <div className={"block-title"}>
            {data.name}
          </div>
          <div>
            <div><b>Total messages sent:</b> {data.total_messages.toLocaleString()}</div>
            <div><b>Dates:</b> {data.start_date}-{data.end_date}</div>
            <div><b>Current Users:</b> {data.users.join(', ')}</div>
            <div><b>Total photos:</b> {data.total_photos.toLocaleString()}</div>
            <div><b>Total videos:</b> {data.total_videos.toLocaleString()}</div>
            <div><b>Total calls:</b> {data.total_calls.toLocaleString()}</div>
            <div><b>Average messages per day:</b> {Math.round((data.total_messages / (data.total_time / 86400)) * 100) / 100}</div>
            <div><b>Average message length:</b> {Math.round(data.mean_message_length * 100) / 100}</div>
            <div><b>Longest silence:</b> {convertSeconds(data.longest_silence).toLocaleString()}</div>
          </div>
        </>
        :
        <NoDataChart
          error={error}
        />
      }
    </div>
  );
}

export default GeneralStatistics;