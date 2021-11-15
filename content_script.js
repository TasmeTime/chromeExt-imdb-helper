window.addEventListener("load", (event) => {
  let url = window.location.origin + window.location.pathname;
  let tmp = document.getElementsByClassName("ipc-split-button");
  let title = document.getElementsByTagName("h1")[0];
  let year = document.getElementsByTagName("span");
  for (let item of year) {
    if (item.className.search("TitleBlockMetaData__ListItemText-") >= 0) {
      year = item.innerText;
      break;
    }
  }

  if (title || title.className.search("TitleHeader__TitleText") >= 0) {
    title = title.innerText + " " + year;
  } else {
    console.warn("IMDB Helper", "Title not found :/");
  }

  let buttons =
    `  <div id="tt-btn-container">
       <form id="tt_form" action="https://filmgirbot.xyz/" method="post" target="_blank">
      <input
        name="imdb"
        type="hidden"
        value="` +
    url +
    `"
      />
      <button id="tt_dl_btn" type="submit">Download</button>
    </form>
      <form id="tt_form" action="https://kickasstorrents.to/usearch/` +
    title +
    `/" target="_blank">
      <button id="tt_dl_btn" type="submit">Torrnet Download</button>
    </form>
    </div>`;

  buttons = stringToHTML(buttons).firstChild;

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  function stringToHTML(str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body;
  }

  if (tmp.length == 1) {
    let addToWatchListBtn = tmp[0];
    insertAfter(addToWatchListBtn, buttons);
    console.log("IMDB Helper started :)");
  }
});
