const PROXY = "https://corsproxy.io/?url=";
const KEMONOROOT = "https://kemono.cr";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type == "postThumbnailURLs") {
    message.urls.forEach((url, index) => {
      const fileType = /\/.*\.([A-z]+)/.exec(url)[1];
      chrome.downloads.download({
        url: url,
        filename: `k${message.postId}+${index}.${fileType}`,
      });
    });
  }
  if (message.type == "getIsKemonoPost") {
    chrome.tabs.query({ active: true, currentWindow: true }, async ([tab]) => {
      sendResponse(
        /https:\/\/kemono\.cr\/[A-z]+\/user\/[0-9]+\/post\/[0-9]+/gm.test(
          tab.url,
        ),
      );
    });
  }
  if (message.type == "downloadAllPosts") {
    chrome.tabs.query({ active: true, currentWindow: true }, async ([tab]) => {
      chrome.scripting.executeScript({
        target: {
          tabId: tab.id,
        },
        func: () => {
          chrome.runtime.sendMessage({
            type: "postThumbnailURLs",
            urls: Array.from(
              document.querySelector(".post__files").children,
            ).map(
              (postThumbnail) => postThumbnail.children[0].children[0].href,
            ),
            postId:
              /https:\/\/kemono\.cr\/[A-z]+\/user\/[0-9]+\/post\/([0-9]+)/gm.exec(
                document.location.href,
              )[1],
          });
        },
      });
    });
  }
  if (message.type == "search") {
    chrome.tabs.query({ active: true, currentWindow: true }, async ([tab]) => {
      chrome.tabs.sendMessage(tab.id, { type: "getResults" }, async (res) => {
        // find matching users
        const response = await fetch(
          PROXY + KEMONOROOT + "/api/v1/creators",
          {
            headers: {
              Accept: "text/css",
            },
          },
        );
        const creators = await response.json();
        console.log(creators);

        console.log(res);
        const creator_matches = res.searchValues.flatMap((value) =>
          creators.filter((creator) => creator[res.searchKey] == value),
        );
        const unique_creator_matches = creator_matches.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id),
        );

        sendResponse({
          creators: unique_creator_matches,
          postId: res.postId,
        });
      });
    });
  }
  if (message.type == "getPost") {
    fetch(
      PROXY +
      KEMONOROOT +
      `/api/v1/${message.creator.service}/user/${message.creator.id}/post/${message.postId}`,
      {
        headers: {
          Accept: "text/css",
        },
      },
    )
      .then((res) => res.json())
      .then(sendResponse)
      .catch((err) => sendResponse(null));
  }

  return true;
});
