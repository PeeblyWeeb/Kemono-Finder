const SEARCH_URL = "https://corsproxy.io/?url=https://kemono.su/api/v1/creators.txt";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  chrome.tabs.query({ active: true, currentWindow: true }, async ([tab]) => {
    chrome.tabs.sendMessage(tab.id, { type: "getUsernames" }, async (res) => {
      const response = await fetch(SEARCH_URL);
      const creators = await response.json();

      const matches = res.usernames.flatMap((username) => creators.filter((creator) => creator.name === username));

      sendResponse(matches);
    });
  });

  return true;
});
