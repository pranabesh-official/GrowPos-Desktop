
const SocketSrver = () => {
    const path = require("path")
    const bodyParser = require('body-parser');
    const express = require('express');
    const app = express();
    const http = require('http').Server(app)
    const io = require('socket.io')(http)

    
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    // UI.use('/static', express.static(path.join(__dirname, 'public')))
    app.use('/static', express.static(path.join(__dirname, 'assets')));

    app.get('/', (req, res) => {
        res.send(path.join(__dirname, 'index.html'));
    })
    app.get('/test', (req, res) => {
        res.send('Welcome to your express API');
    });
    io.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    io.on('connection', function (socket) {
        socket.on('message', ({ name, Massage }) => {
            io.emit('message', { name, Massage })
        })
        console.log('[Socket.io] Connected!')
    })
    app.listen(4545, function () {
        console.log('[Socket.io] listening Port 4545! 🔥')
    })
}

module.exports = SocketSrver;