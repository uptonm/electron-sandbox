const electron = require("electron");
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor() {
    super({
      height: 500,
      width: 300,
      frame: false,
      resizable: false,
      show: false,
      skipTaskbar: true,
      webPreferences: {
        backgroundThrottling: false
      }
    });
    this.on("blur", this.onBlur.bind(this));
  }
  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;
