chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type == "getResults") {
    sendResponse({
      searchKey: "name",
      searchValues: [
        /https:\/\/www\.patreon\.com\/([A-z0-9-_]+)/gm.exec(document.location.href), // patreon.com/username
        /https:\/\/www\.patreon\.com\/c\/([A-z0-9-_]+)/gm.exec(document.location.href), // patreon.com/c/username
        /(.*) \| .* \| Patreon/gm.exec(document.title), // actual display name
      ]
        .filter((match) => match)
        .map((match) => match[1]),
      postId: null,
    });
  }
});
