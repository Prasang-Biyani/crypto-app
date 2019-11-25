const {app, BrowserWindow, Menu} = require('electron')
const path = require('path');
const url = require('url');
const shell = require('electron').shell;

// The IPC Main process can recieve asynchronous and synchronous messages sent from 
// a renderer
const ipc = require('electron').ipcMain;
require('electron-reload')(__dirname);

var win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        // frame: false,
        webPreferences: {
            nodeIntegration: true
        },
        transparent: true,
        alwaysOnTop: true,
    })

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.on('closed', () => {
        win = null;
    })

    var menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {label: 'Adjust Notification Value'},
                {
                    label: 'Coin Market Cap',
                    click() {
                        shell.openExternal('http://coinmarketcap.com')
                    },
                    accelerator: 'CmdorCtrl+Shift+C'
                },
                {
                    label: 'Open Console',
                    click() {
                        win.webContents.openDevTools();
                    }
                },
                // Divides the submenu based on priority
                {type: 'separator'},
                {
                    label: 'Exit',
                    click() {
                        app.quit();
                    }
                }

            ]
        },
        {
            label: 'Info'
        }
    ])
    win.webContents.openDevTools();
    Menu.setApplicationMenu(menu);
}

app.on('ready', createWindow)

ipc.on('update-notify-value', function(event, arg) {
    win.webContents.send('targetPriceVal', arg)
})