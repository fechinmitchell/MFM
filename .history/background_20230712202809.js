chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.toggle === 'on') {
        chrome.declarativeNetRequest.updateDynamicRules({addRules: blockingRules});
      } else {
        chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: [1, 2]});
      }
      sendResponse({status: "done"});
    }
  );
  
  const blockingRules = [
    {id: 1, priority: 1, action: {type: 'block'}, condition: {urlFilter: 'facebook.com', resourceTypes: ['main_frame']}},
    {id: 2, priority: 1, action: {type: 'block'}, condition: {urlFilter: 'instagram.com', resourceTypes: ['main_frame']}}
  ];
  