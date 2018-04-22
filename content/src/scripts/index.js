import React from 'react';
import {render} from 'react-dom';

import App from './components/App';
import Icon from './components/Icon';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.messageText) {
        sendResponse({ "messageText": 'AnswerToBackground' }); 
        console.log(request.messageText);    
        createElement(request.messageText);
    }

    if(request.messageObject){
        console.log(request.messageObject);
        sendResponse({ "messageObject": 'got the object' });
        createIcon(request.messageObject);
    }
});

function createElement(message){
    let container = document.createElement('div');
  
    container.id = 'inject-container';
    document.body.style.transform = "translateY(0)"
    document.documentElement.insertBefore(container, document.documentElement.lastChild);
    render(<App message={message}/>, container);
  }

function createIcon(arr){
    let childs = document.body.querySelectorAll('h2 a, h3 a');

    for(let i=0; i<childs.length; i++){
        /* innerHtml special for bing, that have 2 a-links in one header tag*/
        if(search(childs[i].href, arr) && childs[i].innerHTML!==""){
            let container = document.createElement('span');

            childs[i].parentElement.insertBefore(container,childs[i].parentElement.firstChild);
            render(<Icon height = "20px" width="20px" />, container);
        }
    }
}

function search(urlFull, arr){
    for (let i=0; i < arr.length; i++) {
      if (urlFull.indexOf(arr[i].domain) !== -1){
        return true;
      }
    }
    return false
  } 