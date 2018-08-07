let socket = io();

socket.on('connect', function() {
    console.log('connected to server');
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('new message', message);
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let li = jQuery('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My Location</a>')
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

// For testing before added to dom
// socket.emit('createMessage', {
//     from: 'Ploppy',
//     text: 'Hello there'
// }, function(serverData) {
//     console.log('Got the message... ', serverData);
// });

jQuery('#message-form').on('submit', function(e) {
    // Stop page refresh
    e.preventDefault();
    let messageBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageBox.val()
    }, function() {
        messageBox.val('');
    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});