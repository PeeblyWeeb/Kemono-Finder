const PROXY = "https://corsproxy.io/?url=";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type == "search") {
    chrome.tabs.query({ active: true, currentWindow: true }, async ([tab]) => {
      chrome.tabs.sendMessage(tab.id, { type: "getResults" }, async (res) => {
        // find matching users
        const response = await fetch(PROXY + "https://kemono.su/api/v1/creators.txt");
        const creators = await response.json();

        console.log(res);
        const creator_matches = res.searchValues.flatMap((value) =>
          creators.filter((creator) => creator[res.searchKey] == value)
        );

        sendResponse({
          creators: creator_matches,
          postId: res.postId,
        });
      });
    });
  }
  if (message.type == "getPost") {
    fetch(
      PROXY + `https://kemono.su/api/v1/${message.creator.service}/user/${message.creator.id}/post/${message.postId}`
    )
      .then((res) => res.json())
      .then(sendResponse)
      .catch((err) => sendResponse(null));
  }

  return true;
});
