import React, {useState} from 'react';
import '../app/App.css';
import DragAndDropDirectory from './DragAndDropDirectory';


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
