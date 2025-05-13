function extractUsernames() {
  return [
    /https:\/\/www\.patreon\.com\/(.*)\/$/gm.exec(document.location.href), // patreon.com/username
    /https:\/\/www\.patreon\.com\/c\/(.*)\//gm.exec(document.location.href), // patreon.com/c/username
    /(.*) \| .* \| Patreon/gm.exec(document.title), // actual display name
  ]
    .filter((match) => match)
    .map((match) => match[1]);
}
