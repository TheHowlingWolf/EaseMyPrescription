const { remote } = require("electron");
var win = remote.BrowserWindow.getFocusedWindow();

function winclose() {
    win.close();
  }
  function winmin() {
    win.minimize();
  }
  