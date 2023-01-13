import React from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

import "./NoDataChart.css";


const NoDataChart = (props) => {
  return (
    <>
      {!props.error ? 
        <div className={"waitingForApiSpinner"}>
          <SyncLoader />
        </div>
        :
        "Error"
      }
    </>
  );
}

export default NoDataChart;