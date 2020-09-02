const app = require('express')();
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', function (req, res) {
    res.send('<h1> hi... </h1>')
})

io.on('connection', function (socket) {
    socket.on('message', ({ name, Massage }) => {
        io.emit('message', { name, Massage })
    })
    console.log('Socket io on ')
})

http.listen(4000, function () {
    console.log('listening Port 4000')
})