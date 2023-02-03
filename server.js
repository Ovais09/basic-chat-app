const app = require('express')()
const express = require('express')
const functions = require('firebase-functions');
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        // origin: "http://localhost:5173",
    }
});


app.use(cors());
app.use(express.json())

app.post('/handle', (req, res) => {
    console.log("apple")
    console.log(req.body)
    res.json({
        message: 'Hello from server'
    })
})

let clientSocket;

io.on('connection', (socket) => {
    clientSocket = socket;
    console.log('a user connected');
    console.log(socket.id)
    socket.on('message', (inputValue) => {
        console.log(inputValue)
        socket.broadcast.emit('receive-message', inputValue)
    })
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})

exports.app = functions.https.onRequest(app);
