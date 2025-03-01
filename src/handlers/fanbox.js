const usernames = [
  /https:\/\/(?:www\.)?fanbox\.cc\/@?([a-zA-Z0-9_]+)(?:\/posts\/\d+)?/gm.exec(document.location.href), // username in url
  /([^｜]+)｜pixivFANBOX/gm.exec(document.title), // username in title
]
  .filter((match) => match)
  .map((match) => match[1]);

console.log("Hello, world!", usernames);

usernames.forEach((username) => {
  fetch("https://corsproxy.io/?url=https://kemono.su/api/v1/creators.txt")
    .then((response) => response.json())
    .then((json) => json.filter((creator) => creator.name === username))
    .then((filtered) =>
      filtered.forEach((creator) => console.log(`https://kemono.su/${creator.service}/user/${creator.id}`))
    );
});
