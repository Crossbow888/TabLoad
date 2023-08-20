browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    console.log('Tab has loaded successfully:', tabId);

    let data = {
      tabId: tabId,
      url: tab.url,
      status: 'complete',
      timestamp: new Date().toISOString()
    };
    
    let jsonData = JSON.stringify(data);
    let blob = new Blob([jsonData], { type: 'application/json' });
    let blobUrl = URL.createObjectURL(blob);

    let options = {
      url: blobUrl,
      filename: `tabStatus_${tabId}.json`
    };

    let downloading = browser.downloads.download(options);

    downloading.then(downloadId => {
      console.log(`Started download: ${downloadId}`);
      URL.revokeObjectURL(blobUrl);
    }).catch(error => {
      console.error(`Download failed: ${error}`);
    });
  }
});
