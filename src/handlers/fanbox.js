chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type == "getUsernames") {
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
    });
  }

  return true;
});
