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

    // Emits an event to a single connection
    // socket.emit('newMessage', {
    //     from: 'Jack Booty',
    //     text: 'Let us party poop',
    //     createAt: 12345
    // });
    socket.on('createMessage', (newCreateMessage) => {
        console.log('createMessage', newCreateMessage);
        // Emits an event to every connection
        io.emit('newMessage', {
            from: newCreateMessage.from,
            text: newCreateMessage.text,
            createdAt: new Date().getTime()
        });        
    });

    // socket.emit('newEmail', {
    //     name: 'Song Jif',
    //     email: 'song@jif.com',
    //     text: 'Hey hey hey',
    //     createdAt: 1234
    // });
    // socket.on('createEmail', (newlyCreatedEmail) => {
    //     console.log('createdEmail', newlyCreatedEmail);
    // });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// app.get('/', (req, req) => {
//     res.render('home')
// });

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});