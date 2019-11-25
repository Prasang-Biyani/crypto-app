const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require('axios');
const notifyBtn = document.getElementById('notifyBtn');
notifyBtn.addEventListener('click', function (event) {
    // Stuff here soon

    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({width: 400, height: 200, webPreferences: {nodeIntegration: true}})
    win.on('close', () => {
        win = null;
    })
    win.loadURL(modalPath);
    win.show();
})

var price = document.querySelector('h1');
var targetPrice = document.getElementById('targetPrice');

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
        const crytpos = res.data.BTC.USD
        price.innerHTML = '$' + crytpos.toLocaleString('en')
    })
}

getBTC();
setInterval(getBTC, 30000);


