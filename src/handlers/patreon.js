const usernames = [
  /https:\/\/www\.patreon\.com\/(.*)\/$/gm.exec(document.location.href), // patreon.com/username
  /https:\/\/www\.patreon\.com\/c\/(.*)\//gm.exec(document.location.href), // patreon.com/c/username
  /(.*) \| .* \| Patreon/gm.exec(document.title), // actual display name
]
  .filter((match) => match)
  .map((match) => match[1]);

console.log("Hello, world!", usernames);

usernames.forEach((username) => {
  fetch("https://corsproxy.io/?url=https://kemono.su/api/v1/creators.txt")
    .then((response) => response.json())
    .then((json) => json.filter((creator) => creator.name === username))
    .then((filtered) => {
      const urls = [];
      filtered.forEach((creator) => {
        urls.push(`https://kemono.su/${creator.service}/user/${creator.id}`);
      });
      if (urls.length > 0) alert(urls.join("\n"));
    });
});
