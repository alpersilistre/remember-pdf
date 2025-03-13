console.log("✅ Remember PDF content script loaded!");


(function () {
    function getPdfViewer() {
        return document.querySelector("#viewerContainer");
    }

    function savePageNumber() {
        const viewer = getPdfViewer();
        if (viewer) {
            const currentPage = document.querySelector(".page.active");
            if (currentPage) {
                const pageNumber = currentPage.dataset.pageNumber;
                chrome.storage.sync.set({ [window.location.href]: pageNumber });
            }
        }
    }

    function restorePageNumber() {
        chrome.storage.sync.get(window.location.href, (data) => {
            if (data[window.location.href]) {
                const pageNumber = parseInt(data[window.location.href], 10);
                const viewer = getPdfViewer();
                if (viewer) {
                    viewer.scrollTo(0, document.querySelector(`[data-page-number='${pageNumber}']`).offsetTop);
                }
            }
        });
    }

    document.addEventListener("scroll", savePageNumber);
    document.addEventListener("DOMContentLoaded", restorePageNumber);
})();
