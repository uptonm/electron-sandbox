const path = require("path");
const electron = require("electron");
const TimerTray = require("./app/timer_tray");
const MainWindow = require("./app/main_window");

const { app, ipcMain } = electron;

let mainWindow, tray, eNotify;

app.on("ready", () => {
  mainWindow = new MainWindow();
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  const iconName =
    process.platform === "win32" ? "windows-icon.png" : "iconTemplate.png";
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
  eNotify = require("electron-notify");
  eNotify.setConfig({
    appIcon: path.join(__dirname, "src/assets/windows-icon@2x.png"),
    displayTime: 750,
    maxVisibleNotifications: 1
  });
});

ipcMain.on("update-timer", (event, timeLeft) => {
  let display = false;
  let sec = parseInt(timeLeft.replace(new RegExp(":", "g"), ""));
  if (sec === 20) {
    display = true;
  } else if (sec < 10) {
    display = true;
  }
  tray.setTitle(timeLeft);

  if (process.platform === "win32" && display) {
    if (timeLeft === "00:00:00") {
      eNotify.notify({
        title: "Timer Done",
        text: "Finish your task",
        url: "",
        image: "",
        sound: ""
      });
    } else {
      eNotify.notify({
        title: "timeLeft",
        text: timeLeft,
        url: "",
        image: "",
        sound: ""
      });
    }
  }
});
