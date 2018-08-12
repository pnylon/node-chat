// Built in module to fix paths - console.log(__dirname + '/../public');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users(); 

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');

    // Moved these into "join"
    //socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
    //socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined'));

    socket.on('join', (params, callback) => {
        // Check if not an empty string, non string type, etc.
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        // User joins the room.
        socket.join(params.room);
        // Remove user from possible previous rooms.
        users.removeUser(socket.id);
        // Add user to the new room.
        users.addUser(socket.id, params.name, params.room);

        // Leave a room
        //socket.leave(params.room);

        // Send to everyone in a room.
        // io.emit -> io.to(params.room).emit
        // Send to everyone in a room except for the sender.
        // socket.broadcast.emit -> socket.broadcast.to(params.room).emit
        // Send to a specific user
        // socket.emit

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback();
    });

    socket.on('createMessage', (newCreateMessage, callback) => {
        let user = users.getUser(socket.id);
        // If user exists and string has text.
        if (user && isRealString(newCreateMessage.text)) {
            // Emits an event to every connection
            io.to(user.room).emit('newMessage', generateMessage(user.name, newCreateMessage.text));
        }
        
        // This will run the callback function in createMessage in index.js.
        callback();

        // Emit messages to everyone except yourself.
        // socket.broadcast.emit('newMessage', {
        //     from: newCreateMessage.from,
        //     text: newCreateMessage.text,
        //     createAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left ${user.room}`));
        }
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});