const electron = require("electron");
const app = electron.app
const BrowserWindow = electron.BrowserWindow;

const dialog = electron.dialog;
const server = require("./server");

var path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 350,
        height: 600,
        resizable: false,
        icon: path.join(__dirname, 'assets/icons/png/64x64.png')
    });

    mainWindow.loadURL('file://' + __dirname + "/index.html");

    mainWindow.on("closed", function () {
        mainWindow = null
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform != "darwin") {
        app.quit();
    }
});

app.on("active", function () {
    if (mainWindow == null) {
        createWindow();
    }
})

exports.selectDirectory = function (folderCallback) {
    dialog.showOpenDialog(mainWindow, {
        properties: ['openDirectory']
    }, function (files) {
        if (files.length > 0) {
            server.setFolder(files[0]);
            folderCallback.onChoosen(files[0]);
        }
    });
}

exports.switchServer = function (port) {
    if (server.isServerStop()) {
        console.log(">>>>>>>>>> STATUS（Running) " + server.isServerStop());
        return server.start(port);
    } else {
        return !server.stop();
    }
}

exports.regLogAppend = function (f) {
    server.regLogAppend(f);
}