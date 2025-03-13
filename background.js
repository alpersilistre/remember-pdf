chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!tab || !tab.url) return;

    if (changeInfo.status === "loading" && tab.url.includes(".pdf")) {
        console.log("✅ PDF detected, injecting content script:", tab.url);

        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["content.js"]
        }).then(() => {
            console.log("✅ content.js injected successfully");
        }).catch(err => {
            console.error("❌ Failed to inject content.js:", err);
        });
    }
});
