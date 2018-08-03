// Built in module to fix paths - console.log(__dirname + '/../public');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app!',
        createdAt: new Date().getTime()
    });
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'A new user has joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (newCreateMessage) => {
        console.log('createMessage', newCreateMessage);
        
        // Emits an event to every connection
        io.emit('newMessage', {
            from: newCreateMessage.from,
            text: newCreateMessage.text,
            createdAt: new Date().getTime()
        });

        // Emit messages to everyone except yourself.
        // socket.broadcast.emit('newMessage', {
        //     from: newCreateMessage.from,
        //     text: newCreateMessage.text,
        //     createAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});