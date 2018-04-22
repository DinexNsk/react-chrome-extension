import React, { Component } from 'react';
import { render } from 'react-dom';

function Icon(props){
  return (
    <img 
      src ={chrome.runtime.getURL("/img/fav.png")}
      height = {props.height}
      width = {props.width}
    >
    </img>
  );
}

export default Icon;



