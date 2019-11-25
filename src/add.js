const electron = require('electron')
const path = require('path')
const remote = electron.remote
const closeBtn = document.getElementById('closeBtn')
const ipc = electron.ipcRenderer

closeBtn.addEventListener('click', function(event) {
    var window = remote.getCurrentWindow();
    window.close();
})

const updateBtn = document.getElementById('updateBtn')
updateBtn.addEventListener('click', function() {
    ipc.send('update-notify-value', document.getElementById('notifyVal').value);
    var win = remote.getCurrentWindow();
    window.close();
})



