import React from 'react';
import './Navbar.css';

const SidebarLink = (props) => {
  return (
    <div className={`sidebar-item sidebar-link ${props.disabled ? "disabled" : ""}`} onClick={() => {if (!props.disabled){props.setView(props.name)}}}>
      <div>{props.name}</div>
      {props.activeView === props.name ? <div className={"sidebar-active-marker"}></div> : null}
    </div>
  );
}

export default SidebarLink;
