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

function CreatorPreview(username, platform, postCount, updated, id) {
  const a = document.createElement("a");
  a.href = `https://kemono.su/${platform}/user/${id}`;
  a.target = "_blank";
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

function PostButton(platform, creatorId, postId) {
  const a = document.createElement("a");
  a.href = `https://kemono.su/${platform}/user/${creatorId}/post/${postId}`;
  a.style.display = "flex";
  a.target = "_blank";
  a.innerText = "Current post is available on kemono!";

  return a;
}

chrome.runtime.sendMessage({ type: "search" }, async (response) => {
  document.body.innerHTML = "";

  if (chrome.runtime.lastError) {
    ErrorMessage("Generic Error");
    return;
  }
  if (!response || response.creators.length == 0) {
    document.body.appendChild(ErrorMessage("No Results"));
    return;
  }

  for (const creator of response.creators) {
    if (response.postId != null && response.postId != undefined) {
      chrome.runtime.sendMessage({ type: "getPost", creator: creator, postId: response.postId }, (res) => {
        if (res.error) {
          document.body.appendChild(CreatorPreview(creator.name, creator.service, "?", creator.updated, creator.id));
          return;
        }
        document.body.append(PostButton(creator.service, creator.id, response.postId));
        document.body.appendChild(CreatorPreview(creator.name, creator.service, "?", creator.updated, creator.id));
      });
    }
  }
});
