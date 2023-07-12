const blockedSites = ["*://www.example.com/*"];

chrome.webRequest.onBeforeRequest.addListener(
  function() { return {cancel: true}; },
  {urls: blockedSites},
  ["blocking"]
);
