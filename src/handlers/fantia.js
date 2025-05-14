chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type == "getResults") {
    sendResponse({
      searchKey: "id",
      searchValues: [
        /https:\/\/fantia\.jp\/fanclubs\/([0-9]+)/gm.exec(document.location.href), // https://fantia.jp/fanclubs/[user_id]
      ]
        .filter((match) => match)
        .map((match) => match[1]),
      postId: null,
    });
  }
});
