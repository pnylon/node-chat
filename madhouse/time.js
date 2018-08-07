
// Getting a nicely formatted date is complicated using date() so use momentjs instead.
let moment = require('moment');

let date = moment();
console.log(date.format('MMM Do, YYYY - h:mm a'));
console.log(date.format('h:mm a'));

let aTimeStamp = moment().valueOf();
console.log(aTimeStamp);

let createdAt = 000000;
let date1 = moment(createdAt);
