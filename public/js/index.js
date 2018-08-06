let socket = io();

socket.on('connect', function() {
    console.log('connected to server');
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('new message', message);
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

// For testing before added to dom
// socket.emit('createMessage', {
//     from: 'Ploppy',
//     text: 'Hello there'
// }, function(serverData) {
//     console.log('Got the message... ', serverData);
// });

jQuery('#message-form').on('submit', function (e) {
    // Stop page refresh
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    });
});