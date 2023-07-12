const blockedSites = ["*://*.instagram.com/*", "*://*.facebook.com/*"];

chrome.webRequest.onBeforeRequest.addListener(
  function() { return {cancel: true}; },
  {urls: blockedSites},
  ["blocking"]
);
