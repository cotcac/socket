// socket on it own server.

var socket = require('socket.io');
var express = require('express');
var app = express();
require('dotenv').config()//***your magic line
var server = require('http').createServer(app);
var io = socket.listen(server);
var port = process.env.PORT || 3001;
server.listen(port, function () {
    console.log('Server listening at port %d', port);
});
var Redis = require("ioredis");
var sub = new Redis(process.env.REDIS_URI);

sub.subscribe("notify", "music", function (err, count) {
    if (err) throw err;
    console.log(count);
})


io.on('connection', function (socket) {
    // send message
    console.log("[x]", socket.id);
    sub.on("message", function (channel, message) {
        console.log("receive: [%s] [%s]", message, channel);
        const data = JSON.parse(message);
       /**
        * If Message have sessionID send to only 1 client.
        * Else send to all client connect to that room.
        */
        const room = (data.sessionID)? `new message_${data.sessionID}`:`new message_`;
        socket.emit(room , "hello " + message);
    })

});
