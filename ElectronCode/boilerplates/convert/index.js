const _ = require("lodash");
const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      backgroundThrottling: false
    }
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});

ipcMain.on("videos:added", (event, videos) => {
  /* Single Video Format */
  // const promise = new Promise((resolve, reject) => {
  //   ffmpeg.ffprobe(videos[0].path, (err, metadata) => {
  //     resolve(metadata);
  //   });
  // });
  // promise.then(metadata => console.log(metadata));

  /* Refactor for Multiple Videos */
  const promises = _.map(videos, video => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, metadata) => {
        resolve(metadata);
      });
    });
  });

  Promise.all(promises).then(results => console.log(results));
});
