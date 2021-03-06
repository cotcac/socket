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
const arrayChannel = process.env.CHANNEL.split(',');// ["notify", "music"]
sub.subscribe(...arrayChannel, function (err, count) {
    if (err) {
        console.log('[ERROR] SUBCRIBE CHANNEL',err);
        process.exit(1);
    }
    console.log(`SUBCRIBE TO ${count} CHANNELS`);
})


io.on('connection', function (socket) {
    // send message
    sub.on("message", function (channel, message) {
        console.log("receive: [%s] [%s]", message, channel);
        const data = JSON.parse(message);
       /**
        * If Message have sessionID send to only 1 client.
        * Else send to all client connect to that room.
        */
        const room = (data.sessionID)? `${channel} ${data.sessionID}`:`${channel}`;
        socket.emit(room , "hello " + data.content);
    })

});
