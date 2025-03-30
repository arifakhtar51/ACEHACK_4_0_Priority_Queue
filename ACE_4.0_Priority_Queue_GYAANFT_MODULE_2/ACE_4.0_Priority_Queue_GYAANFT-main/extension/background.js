let blockedSites = [];
let allowedSites = ["localhost:5173"]; // Only allow localhost:5173

function shouldBlock(url) {
  try {
    const { hostname, port } = new URL(url);

    // Allow only localhost:5173
    if (hostname === "localhost" && port === "5173") {
      return false;
    }

    return true; // Block everything else
  } catch (error) {
    return false;
  }
}

// Listen for tab updates and redirect to `blocked.html`
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.storage.local.get('blockerEnabled', (data) => {
    const isEnabled = data.blockerEnabled !== undefined ? data.blockerEnabled : true;

    if (isEnabled && changeInfo.status === "loading" && shouldBlock(tab.url)) {
      chrome.tabs.update(tabId, {
        url: chrome.runtime.getURL("blocked.html") // Redirect to a custom block page
      });
    }
  });
});

// Restore blocked sites from storage (not needed but kept for future expansion)
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("allowedSites", (data) => {
    allowedSites = data.allowedSites || ["localhost:5173"];
  });
});