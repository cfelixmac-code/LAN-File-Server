const electron = require('electron')
const remote = electron.remote
const mainProcess = remote.require('./app')

mainProcess.regLogAppend(function (content) {
    var list = document.getElementById('logList');
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(content));
    list.appendChild(entry);
});

function chooseFolder() {
    mainProcess.selectDirectory({
        onChoosen: function (pathName) {
            document.getElementById('folderName').innerText = pathName;
        }
    });
}

function switchServer() {
    var btn = document.getElementById('actionBtn');
    var port = document.getElementById('portInput').value;
    if (mainProcess.switchServer(port) == true) {
        btn.innerText = "Stop Server";
        btn.classList.remove("btn-success");
        btn.classList.add("btn-danger");
    } else {
        btn.innerText = "Start Server";
        btn.classList.remove("btn-danger");
        btn.classList.add("btn-success");
    }
}