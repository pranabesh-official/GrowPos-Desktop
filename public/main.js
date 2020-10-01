const { app, BrowserWindow } = require('electron')
const path = require("path")
const isDev = require("electron-is-dev")
const { ipcMain } = require('electron')
const { PosPrinter } = require('electron-pos-printer');
const mongoPathExist = require('./mongodb/mongoStart');
const gotTheLock = app.requestSingleInstanceLock()
const spawn = require('child_process').spawn;

let mainWin = null
if (!gotTheLock) {
    app.quit()
} else {
    let mongopid = null
    let mongoServer = null
    const dbserver = () => {
        mongoServer = spawn(path.join(__dirname, './mongodb/mongod.exe'), ['--dbpath', '/data/db'], {
            stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
        });
        return new Promise((resolve, reject) => {
            let sucsess = false
            console.log('[Mongod] Mongodb Server Starting!')
            mongoServer.stdout.on('data', (d) => {
                console.log('[Mongod]', 'sucsess');
                sucsess = true
                resolve(sucsess)
            });
            mongoServer.stderr.on('data', (d) => {
                console.log('[Mongod] Mongodb Server Faild Started!');
                reject(d.toString('utf8'), d.toString('utf8'))
            });
            mongoServer.on('close', (code) => {
                console.log('[Mongod] Mongodb Server EXIT!');
            });
            mongopid = mongoServer.pid;
            console.log(['MongoPid'], mongopid)
        })
    }
    
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (mainWin) {
            if (mainWin.isMinimized()) mainWin.restore()
            mainWin.focus()
        }
    })
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
            mainWin = loading
            mongoPathExist().then(() => {
                dbserver().then((sucsess) => {
                    const SocketSrver = require('./SocketServer/server');
                    const TortoiseDB = require('./tortoiseDB/tortoiseDB');
                    SocketSrver()
                    if (sucsess) {
                        db = new TortoiseDB({
                            name: 'ShopDB',
                            port: 4040,
                            mongoURI: 'mongodb://localhost:27017',
                            batchLimit: 1000,
                        });
                        db.start()
                    }
                })
            })
            main = new BrowserWindow({
                width: 1000,
                height: 700,
                minWidth: 1000,
                minHeight: 680,
                show: false,
                frame: false,
                titleBarStyle: 'hidden',
                webPreferences: {
                    nodeIntegration: true,
                    enableRemoteModule: true,
                }
            })
          
            main.webContents.once('dom-ready', () => {
                console.log('main loaded')
                main.show()
                mainWin = main
                loading.hide()
                loading.close()
            })
            // long loading html
            main.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
           
            ipcMain.on('print-pos', (event, arg) => {
                console.log(arg)
                const Print = JSON.parse(arg)
                console.log(Print)
                const options = {
                    preview: Print.option.preview,
                    width: '170px',
                    margin: '0 0 0 0',
                    copies: Print.option.copies,
                    silent: Print.option.silent,
                    printerName: Print.option.printerName,
                    timeOutPerLine: Print.option.timeOutPerLine
                }

                PosPrinter.print(Print.data, options)
            })

        })
        loading.loadURL(isDev ? `file://${path.join(__dirname, './loading/loading.html')}` : `file://${path.join(__dirname, '../build/loading/loading.html')}`)
        loading.webContents.once('dom-ready', () => {
            loading.show()
        })
    })
    const checkRunning = (pid) => {
        return new Promise((resolve, reject) => {
            try {
                process.kill(pid, 0);
                resolve(`kill Pid ${pid} Sucsess`)
            } catch (error) {
                console.error(error);
                reject(error.code === 'EPERM')
            }
        })
    }
    const KillRunning = () => {
        mongoServer.kill('SIGINT')
    }
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            checkRunning(mongopid).then((r) => {
                console.log(r)
                KillRunning()
                app.quit()
            })
        }
    })
}




