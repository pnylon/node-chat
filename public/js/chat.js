let socket = io();

function scrollToBottom() {
    // Selectors
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last');
    // Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let prevMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + prevMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
};

socket.on('connect', function() {
    let params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (error) {
        if (error) {
            alert(error);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('updateUserList', function (users) {
    let olist = jQuery('<ol></ol>');

    users.forEach(function(user) {
        olist.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(olist);
});

socket.on('newMessage', function(message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#message-template').html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();

    // console.log('new message', message);
    // let formattedTime = moment(message.createdAt).format('h:mm a');
    // let li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();

    // let formattedTime = moment(message.createdAt).format('h:mm a');
    // let li = jQuery('<li></li>');
    // let a = jQuery('<a target="_blank">My Location</a>')
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
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