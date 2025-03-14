chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!tab) return;

    if (changeInfo.status === "complete" && tab.url.includes(".pdf")) {
        console.log("✅ PDF detected, injecting content script:", tab.url);
    }
});