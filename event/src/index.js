import axios from 'axios';

class EventPage {
  constructor(){
    this.count = 0;
  }
}

EventPage.prototype.getData = function() {
  axios.get('https://softomate.net/ext/employees/list.json')
    .then(response => response.data)
    .then(result => this.listOfSites = result)
    .catch(err => console.log('parsing failed', err))
}

EventPage.prototype.startListener = function () {
  chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tab) => {

      if((this.count < 3) && changeInfo.status === "complete" &&
        this.search(tab.url, this.listOfSites)){

        this.count++;
        let message = this.listOfSites[this.foundIndex].message;

        chrome.tabs.sendMessage(tab.id, {messageText: message}, this.getResponse);
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
              this.count = request.messageText;
              sendResponse({"messageText": `Current count is ${this.count}`});
        });
      }
    }
  );
}

EventPage.prototype.getResponse = function(response){
  if (chrome.runtime.lastError) {
    console.log("ERROR: ", chrome.runtime.lastError);
  } else {
    console.log(response);  
  }
}

EventPage.prototype.search = function(urlFull, arr){
  for (let i=0; i < arr.length; i++) {
    if (urlFull.indexOf(arr[i].name) !== -1){
      this.foundIndex = i;
      return true;
    }
  }
  return false
} 

let event = new EventPage();

event.getData();
event.startListener();
  
   