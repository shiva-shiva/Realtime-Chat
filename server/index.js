const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');
const PORT = process.env.PORT || 5000
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
const router = require('./router')
io.on('connection', (socket)=>{
 console.log('we have a new connection!!!')
 socket.on('join', ({name ,room})=>{
     console.log(name ,room);
 })
 socket.on('disconnect',()=>{
     console.log('User had left!!!');
 })
});


app.use(router);
server.listen(PORT, ()=>{
    console.log(`Server has started on port ${PORT}`);
})