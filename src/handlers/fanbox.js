const usernames = [
  /https:\/\/(.*)\.fanbox\.cc/gm.exec(document.location.href), // username.fanbox.cc
  /https:\/\/fanbox\.cc\/@(.*)/gm.exec(document.location.href), // fanbox.cc/@username
  /(.*)｜pixivFANBOX/gm.exec(document.title), // actual display name
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
