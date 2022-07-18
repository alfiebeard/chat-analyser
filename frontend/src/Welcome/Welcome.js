import React, {useState} from 'react';
import '../App.css';
import DragAndDropDirectory from '../Welcome/DragAndDropDirectory';


const Welcome = (props) => {
  return (
    <>
      <div>Welcome to the Facebook groupchat analyser</div>
      <div>Overview and description</div>
      <div>Some screenshots</div>
      <div>Get started</div>
      <DragAndDropDirectory 
        setDataLoaded={props.setDataLoaded}
      />
    </>
  );
}

export default Welcome;
