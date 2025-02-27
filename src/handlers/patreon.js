const usernames = [
  /https:\/\/www\.patreon\.com\/(.*)\/$/gm.exec(document.location.href), // patreon.com/username
  /https:\/\/www\.patreon\.com\/c\/(.*)\//gm.exec(document.location.href), // patreon.com/c/username
  /(.*) \| .* \| Patreon/gm.exec(document.title), // actual display name
]
  .filter((match) => match)
  .map((match) => match[1]);

usernames.forEach((username) => {
  fetch("https://corsproxy.io/?url=https://kemono.su/api/v1/creators.txt")
    .then((response) => response.json())
    .then((json) => json.filter((creator) => creator.name === username))
    .then((filtered) =>
      filtered.forEach((creator) => console.log(`https://kemono.su/${creator.service}/user/${creator.id}`))
    );
});
console.log("Hello, world!", usernames);
