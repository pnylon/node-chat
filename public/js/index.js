let socket = io();

socket.on('connect', function() {
    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'Sue Goox',
        text: 'I say'
    });

    socket.emit('createEmail', {
        to: 'fabby@top.com',
        text: 'Wazzup?' 
    })
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('new message', message);
});

socket.on('newEmail', function(email) {
    console.log('new email', email);
});