document.addEventListener('DOMContentLoaded', function () {
    let toggleButton = document.getElementById('toggleButton');
  
    // Load current state of the blocker from storage
    chrome.storage.sync.get('blockerState', function(data) {
      if (data.blockerState === 'on') {
        toggleButton.classList.add('on-button');
        toggleButton.textContent = 'ON';
      } else {
        toggleButton.classList.add('off-button');
        toggleButton.textContent = 'OFF';
      }
    });
  
    toggleButton.addEventListener('click', function() {
      // Toggle the state of the blocker
      chrome.storage.sync.get('blockerState', function(data) {
        let newState = (data.blockerState === 'on') ? 'off' : 'on';
        
        // Update the state in storage
        chrome.storage.sync.set({'blockerState': newState}, function() {
          // Update the button appearance
          if (newState === 'on') {
            toggleButton.classList.remove('off-button');
            toggleButton.classList.add('on-button');
            toggleButton.textContent = 'ON';
          } else {
            toggleButton.classList.remove('on-button');
            toggleButton.classList.add('off-button');
            toggleButton.textContent = 'OFF';
          }
  
          // Update the blocking rules
          if (newState === 'on') {
            chrome.declarativeNetRequest.updateDynamicRules({addRules: blockingRules});
          } else {
            chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: [1, 2]});
          }
        });
      });
    });
  });
  
  const blockingRules = [
    {id: 1, priority: 1, action: {type: 'block'}, condition: {urlFilter: 'facebook.com', resourceTypes: ['main_frame']}},
    {id: 2, priority: 1, action: {type: 'block'}, condition: {urlFilter: 'instagram.com', resourceTypes: ['main_frame']}}
  ];
  