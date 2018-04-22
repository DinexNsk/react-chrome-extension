import React from 'react';
import {render} from 'react-dom';

import App from './components/App';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.messageText) {
        sendResponse({ "messageText": 'AnswerToBackground' }); 
        console.log(request.messageText);    
        createElement(request.messageText);
    }
});

function createElement(message){
    let anchor = document.createElement('div');
  
    anchor.id = 'rcr-anchor';
    document.body.style.transform = "translateY(0)"
    document.documentElement.insertBefore(anchor, document.documentElement.lastChild);

    render(<App message={message}/>, anchor);
  }