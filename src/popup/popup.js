function humanReadableRelativeTime(seconds) {
  const units = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const unit in units) {
    const value = Math.floor(seconds / units[unit]);
    if (value > 0) {
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
      return rtf.format(-value, unit);
    }
  }
  return "now";
}

function ErrorMessage(message) {
  div = document.createElement("div");
  div.classList.add("error");

  h2 = document.createElement("h2");
  h2.innerText = message;
  div.appendChild(h2);

  return div;
}

function CreatorPreview(username, platform, post_count, updated, id) {
  const a = document.createElement("a");
  a.href = `https://kemono.su/${platform}/user/${id}`;
  a.style.display = "flex";

  const img = document.createElement("img");
  img.src = `../../img/${platform}.png`;
  a.appendChild(img);

  const div = document.createElement("div");
  div.style.marginLeft = "10px";
  a.appendChild(div);

  const name = document.createElement("h2");
  name.innerText = username;
  name.style.margin = "0px";
  div.appendChild(name);

  const upd = document.createElement("p");
  upd.innerText = `Last updated: ${humanReadableRelativeTime(Date.now() / 1000 - updated)}`;
  upd.style.margin = "0px";
  div.appendChild(upd);

  //   const posts = document.createElement("p");
  //   posts.innerText = `${post_count} post(s)`;
  //   posts.style.margin = "0px";
  //   div.appendChild(posts);

  return a;
}

chrome.runtime.sendMessage({ type: "search" }, async (response) => {
  document.body.innerHTML = "";

  if (!response || response.length == 0) {
    console.log("no results");
    document.body.appendChild(ErrorMessage("No Results"));
    return;
  }

  response.forEach((result) => {
    console.log(result.updated);
    document.body.appendChild(CreatorPreview(result.name, result.service, "?", result.updated, result.id));
  });

  document.body.innerHTML += "use right click + open in new tab :)";
});
