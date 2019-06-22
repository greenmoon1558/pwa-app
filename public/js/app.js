if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(reg => console.log("serviceWorker is registered", reg))
    .catch(err => console.log("serviceWorker is not registered. ", err));
}
