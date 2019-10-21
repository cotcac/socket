# Socket server
This socket server help you communicate with client.

![Alt][1]

[1]: /socket.jpg "Title"

# Quick start

## First run Redis server

```
docker run --name redis --net=mynet -d -e ALLOW_EMPTY_PASSWORD=yes bitnami/redis:latest
```
## Then Run the app
```
docker-compose up
```

# Example code

# [worker] public message to redis.
```
const Redis = require("ioredis");
const pub = new Redis();
pub.publish("notify", `this is the messaage`);
```
# [socket] send message to client
```
 socket.emit(socket.id + '_new message', "hello " + message);
```
# [client] get message from socket
```
// connect to socket server
 var socket = io.connect( 'http://localhost:3001' );
  socket.on("connect", function () {
        const sessionID = socket.id;
        socket.on(sessionID + '_new message', function (data) {
        console.log('[Node server:] ' + data);
});

```

# .env
```
REDIS_URI=redis://redis:6379 
```
the second redis is the container name in the same network.