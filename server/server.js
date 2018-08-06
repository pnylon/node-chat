// Built in module to fix paths - console.log(__dirname + '/../public');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} =require('./utils/message');

const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined'));

    socket.on('createMessage', (newCreateMessage, callback) => {
        console.log('createMessage', newCreateMessage);
        
        // Emits an event to every connection
        io.emit('newMessage', generateMessage(newCreateMessage.from, newCreateMessage.text));
        // This will run the callback function in createMessage in index.js.
        callback('\nThis is from the server.');

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