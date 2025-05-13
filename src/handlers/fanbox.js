chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type == "getResults") {
    sendResponse({
      usernames: [
        /@([a-zA-Z0-9_]+)/gm.exec(document.location.href), // https://www.fanbox.cc/@[username]
        /\/\/(?!www\.)([^.]+)\.f/gm.exec(document.location.href), // https://[username].fanbox.cc/
        document.location.href.includes("/posts")
          ? /^.*｜(.*)｜p/gm.exec(document.title)
          : /^([^｜]*)｜p/gm.exec(document.title), // username in title
      ]
        .filter((match) => match)
        .map((match) => match[1]),
      postId: /\/posts\/([0-9]+)/gm.test(document.location.href)
        ? /\/posts\/([0-9]+)/gm.exec(document.location.href)[1]
        : null,
    });
  }

  //   return true;
});
