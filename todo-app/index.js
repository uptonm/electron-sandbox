const electron = require("electron");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow, addWindow;
app.on("ready", () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on("close", () => app.quit());

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
  addWindow = new BrowserWindow({
    height: 200,
    width: 300,
    title: "Add New Todo"
  });
  addWindow.loadURL(`file://${__dirname}/form.html`);
  addWindow.on("closed", () => {
    addWindow = null; // Remove memory reference for garbage collection
  });
}

ipcMain.on("todo:add", (event, todo) => {
  mainWindow.webContents.send("todo:add", todo);
  addWindow.close();
});

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Todo",
        click() {
          createAddWindow();
        }
      },
      {
        label: "Clear Todos",
        accelerator: process.platform === "darwin" ? "Command+F" : "Ctrl+F",
        click() {
          mainWindow.webContents.send("todo:clear");
        }
      },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

if (process.platform === "darwin") {
  menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "View",
    submenu: [
      {
        label: "Toggle Developer Tools",
        accelerator:
          process.platform === "darwin" ? "Command+Alt+I" : "Ctrl+Shift+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: "reload"
      }
    ]
  });
}
