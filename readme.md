# Socket server
This socket server help you communicate with client.

![Alt][1]

[1]: /socket.png "Title"
# Demo

![Alt][2]

[2]: /socket.gif "Title"
# Quick start

## First run Redis server

```
docker run --name redis --net=mynet -d -e ALLOW_EMPTY_PASSWORD=yes bitnami/redis:latest
```
## Then Run the app
Create .env file copy from .env.example
```
CHANNEL=notify,news,music
```
Channel array sperate by comma( , ).
```
docker-compose up
```

# Example code

# [worker] public message to redis.
```
const Redis = require("ioredis");
const pub = new Redis();
const data = {
      sessionID:'client SessionID'// optinal
      content:'Hello there'
}
pub.publish("notify", `${JSON.stringify(data)}`);
```
Where:
- notify is channel name
- sessionID is the ID the client send to server to identify itself (optinal).
- content: The actual message you want to send to client.

# [socket] send message to client
```
// {sessionID:aaa, content:"my message"}
const data = JSON.parse(message); 
// channel or channel sessionID
const room = (data.sessionID)? `${channel} ${data.sessionID}`:`${channel}`;
socket.emit(room , "hello " + data.content);// send to client.
```
# [client] get message from socket
```
// connect to socket server
 var socket = io.connect( 'http://localhost:3001' );
  socket.on("connect", function () {
        // Room
        socket.on(channel, function (data) {
            console.log(`[ ${channel} ]` + data);
        });
        // Only me
         socket.on(`${channel} ${sessionID}`, function (data) {
            console.log(`[ ${channel} ]` + data);
        });
});

```

# .env
```
PORT=3001
REDIS_URI=redis://redis:6379
CHANNEL=notify,news,music
```

# Example Client and API

https://github.com/cotcac/client-api-for-socket
