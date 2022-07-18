import React, {useState, useEffect} from 'react';
import './App.css';
import { clearData } from './api/api';

import SidebarLink from './SidebarLink';


const Navbar = (props) => {

  return (
    <>
      <div className={"sidebar-item sidebar-title"}>
        Groupchat Analyser
      </div>
      <div className={"sidebar-item"}>
        <button onClick={() => {clearData(props.setDataLoaded)}} disabled={!props.dataLoaded}>Clear Data</button>
      </div>
      <SidebarLink 
        name={"Home"}
        activeView={props.view}
        setView={props.setView}
        fade={false}
      />
      <SidebarLink 
        name={"Analysis"}
        activeView={props.view}
        setView={props.setView}
        disabled={!props.dataLoaded}
      />
      <SidebarLink 
        name={"Chat"}
        activeView={props.view}
        setView={props.setView}
        disabled={!props.dataLoaded}
      />
    </>
  );
}
export default Navbar;
