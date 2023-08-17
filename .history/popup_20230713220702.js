document.addEventListener('DOMContentLoaded', function () {
    let toggleButton = document.getElementById('toggleButton');
  
    // Load current state of the blocker from storage
    chrome.storage.sync.get('blockerState', function(data) {
      if (data.blockerState === 'on') {
        toggleButton.classList.add('on-button');
        toggleButton.textContent = 'Social Media Block is ON';
      } else {
        toggleButton.classList.add('off-button');
        toggleButton.textContent = 'Social Media Block is OFF';
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
            toggleButton.textContent = 'Social Media Block is ON';
          } else {
            toggleButton.classList.remove('on-button');
            toggleButton.classList.add('off-button');
            toggleButton.textContent = 'Social Media Block is OFF';
          }
  
          // Send a message to the background script to update the blocking rules
          chrome.runtime.sendMessage({toggle: newState}, function(response) {
            console.log(response.status);
          });
        });
      });
    });
  });
  