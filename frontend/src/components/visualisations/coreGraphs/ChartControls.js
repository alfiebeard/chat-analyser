import React, {useState, useEffect} from 'react';
// import {Chart as Chartjs} from 'chart.js/auto';
// import {Chart} from 'chart.js';
import { Button } from 'react-bootstrap';


const ChartControls = (props) => {
  return (
    <>
      <Button onClick={() => {props.selectDeselectAll()}}>Select/Deselect all</Button>
    </>
  );
}

export default ChartControls;