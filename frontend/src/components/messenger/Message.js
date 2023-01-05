import React, {useState, useEffect} from 'react';
import '../app/App.css';


const Message = (props) => {
  return (
    <div>
      <div>
        {props.message.sender_name}
      </div>
      <div>
        {props.message.datetime}
      </div>
      <div>
        {props.message.content}
      </div>
    </div>
  );
}

export default Message;