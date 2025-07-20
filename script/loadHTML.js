function loadHTML(id, url, jsPath = null) {
  fetch(url)
  .then(res => res.text())
  .then(data => {
    document.getElementById(id).innerHTML = data;

    if (jsPath) {
    const script = document.createElement('script');
    script.src = jsPath;
    document.body.appendChild(script);
    }
  });
}

loadHTML("header", "/page/header.html", "/script/header.js");
loadHTML("header_auth", "/page/header_auth.html", "/script/header.js");