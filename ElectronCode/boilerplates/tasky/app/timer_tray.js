const electron = require("electron");
const { Tray } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    this.setToolTip("Timer App");
    this.on("click", this.onClick);
  }

  onClick(event, bounds) {
    const { x, y } = bounds;
    const { height, width } = this.mainWindow.getBounds();
    const yPos = process.platform === "darwin" ? y : y - height;
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.setBounds({
        x: x - width / 2,
        y: yPos,
        height: height,
        width: width
      });
      this.mainWindow.show();
    }
  }
}

module.exports = TimerTray;
