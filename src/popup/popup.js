chrome.runtime.sendMessage({ type: "search" }, async (response) => {
  document.body.innerHTML = "";

  if (!response) {
    document.body.innerText = "No Results";
    return;
  }

  response.forEach((result) => {
    document.body.innerHTML += `<a href="https://kemono.su/${result.service}/user/${result.id}">${result.name}(${result.service}) on kemono.su</a><br>`;
  });
});
