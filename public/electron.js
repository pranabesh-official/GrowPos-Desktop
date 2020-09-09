const { app, BrowserWindow } = require('electron')
const path = require("path")
const isDev = require("electron-is-dev")
const { ipcMain } = require('electron')
const spawn = require('child_process').spawn;
const UI = require('express')();
const http = require('http').Server(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser');
const {PosPrinter} = require('electron-pos-printer');
// const cors = require('cors')
// const { fork } = require('child_process');
// const { PythonShell } = require('python-shell')

const PyServer = require('./pyServer/PyServer');

let mongoclient = false
let mongoServermsg = 'Mongodb Start Sucsess!'
if (mongoclient) {
    mongoServermsg = 'MongoClient Connected!'
}
let mongoServer = null
const dbserver = () => {
    mongoServer = spawn(path.join(__dirname, './mongodb/mongod.exe'), ['--dbpath', '/data/db'], {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
    });
    return new Promise((resolve, reject) => {
        // let sucsess = false
        console.log('[Mongod] Mongodb Server Starting!')
        mongoServer.stdout.on('data', (d) => {
            console.log('[Mongod]', mongoServermsg);
            // sucsess = true
            resolve(d)
        });
        mongoServer.stderr.on('data', (d) => {
            console.log('[Mongod] Mongodb Server Faild Started!');
            reject(d.toString('utf8'), mongoServer)
        });
        mongoServer.on('close', (code) => {
            console.log('[Mongod] Mongodb Server EXIT!');
        });

    })
}

const SocketSrver = () => {
    UI.use(bodyParser.json({ limit: '50mb' }));
    UI.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    UI.get('/', function (req, res) {
        res.send('<h1> hi... </h1>')
    })
    io.on('connection', function (socket) {
        socket.on('message', ({ name, Massage }) => {
            io.emit('message', { name, Massage })
        })
        console.log('[Socket.io] Connected!')
    })
    UI.listen(4000, function () {
        console.log('[Socket.io] listening Port 4000!')
    })
}

PyServer().then((msg)=>{
    console.log(msg)
})
// const installExtensions = async () => {
//     const installer = require('electron-devtools-installer')
//     const forceDownload = !!process.env.UPGRADE_EXTENSIONS
//     const extensions = [
//         'REACT_DEVELOPER_TOOLS',
//         'REDUX_DEVTOOLS',
//         'DEVTRON'
//     ]

//     return Promise
//         .all(extensions.map(name => installer.default(installer[name], forceDownload)))
//         .catch(console.log)
// }
// if (isDev) {
//     const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer')
//     app.whenReady().then(() => {
//         installExtension(REDUX_DEVTOOLS)
//             .then((name) => console.log(`Added Extension:  ${name}`))
//             .catch((err) => err);
//     });
// }
app.on('ready', async () => {
    let main = null
    let loading = new BrowserWindow({
        width: 200,
        height: 200,
        minWidth: 200,
        minHeight: 200,
        maxWidth: 200,
        maxHeight: 200,
        show: false,
        frame: false,
        transparent: true,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    })
    let db = null
    loading.once('show', () => {
        dbserver().then((sucsess) => {
            const TortoiseDB = require('./mongodb/tortoiseDB/tortoiseDB');
            SocketSrver()
            if (sucsess) {
                db = new TortoiseDB({
                    name: 'Database',
                    port: 4040,
                    mongoURI: 'mongodb://localhost:27017',
                    batchLimit: 1000,
                });
                db.start()
                mongoclient = true
            }
        })
        main = new BrowserWindow({
            width: 1000,
            height: 700,
            minWidth: 980,
            minHeight: 680,
            show: false,
            frame: false,
            titleBarStyle: 'hidden',
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
            }
        })
        let settingsWin = new BrowserWindow({
            width: 800,
            height: 600,
            minWidth: 800,
            minHeight: 600,
            parent: main,
            show: false,
            webPreferences: {
                nodeIntegration: true,
            }
        })
        main.webContents.once('dom-ready', () => {
            console.log('main loaded')
            main.show()
            loading.hide()
            loading.close()
        })
        // long loading html
        main.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
        settingsWin.loadURL('http://localhost:4000')

        settingsWin.on('close', (e) => {
            e.preventDefault();
            settingsWin.hide()
        })
        ipcMain.on('dev-settings', (event, arg) => {
            settingsWin.show()

        })
        ipcMain.on('print-pos', (event, arg) => {
            const data = JSON.parse(arg)
            PosPrinter.print(data ,{
                
            })
        })
        main.on('close', (e) => {
            // db.dropDB().then(() =>{
            //     console.log('[dropDB] quit')
            // })

        });
    })
    loading.loadURL(isDev ? `file://${path.join(__dirname, './loading/loading.html')}` : `file://${path.join(__dirname, '../build/loading/loading.html')}`)
    loading.webContents.once('dom-ready', () => {
        loading.show()
    })
})

app.on('window-all-closed', () => {
    mongoServer.kill('SIGINT')
    console.log('application quit')
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

