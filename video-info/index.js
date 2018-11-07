const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
const fluent_ffmpeg = require("fluent-ffmpeg");

app.on("ready", () => {
  const view = new BrowserWindow({});
  view.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on("video:submit", (event, path) => {
  let ffmpeg = fluent_ffmpeg(path).setFfprobePath(
    "C:\\ffmpeg-3.3.3\\bin\\ffprobe.exe"
  );
  ffmpeg.ffprobe(path, (err, metadata) => {
    console.log(metadata);
  });
});
