const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const router = require('./router')

io.on('connection', (socket)=>{
 console.log('we have a new connection!!!')
 socket.on('disconnect',()=>{
     console.log('User had left!!!');
 })
});


app.use(router);
server.listen(PORT, ()=>{
    console.log(`Server has started on port ${PORT}`);
})