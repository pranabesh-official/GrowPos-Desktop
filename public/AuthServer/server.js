module.exports = function setUpServer(mongoURI) {
    const path = require("path")
    const bodyParser = require('body-parser');
    const express = require('express');
    const app = express();
    const http = require('http').Server(app)
    const connection = require('./db/connection.js'); // require('./db/connection')
    const userRouter = require('./routers/user.routers')
    const taskRouter = require('./routers/task.routers')
    const cors = require('cors')
    const io = require("socket.io")(http, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });
    connection(mongoURI)

    app.use(bodyParser.json({
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(cors())
    app.use('/static', express.static(path.join(__dirname, 'assets')));
    app.use(userRouter);
    app.use(taskRouter);

    io.on('connection', function (socket) {
        require('dns').resolve('www.google.com', function (err) {
            if (err) {
                socket.on('Internet', false)
                console.log('[Socket.io] "No connection"')
            } else {
                socket.on('Internet', true)
                console.log('[Socket.io] "Internet-Connected"')
            }
        });
    })

    return io;
}