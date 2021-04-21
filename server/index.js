const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');

const {addUser, removeUser, getUser,getUsersInRoom}= require('./users.js')

const PORT = process.env.PORT || 5000
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
const router = require('./router');
const { callbackify } = require('util');
io.on('connection', (socket)=>{
 console.log('we have a new connection!!!')
 socket.on('join', ({name ,room},callback)=>{
     const {error , user} = addUser({id:socket.id, name, room});
     if(error) return callback(error);

     socket.join(user.room)
     socket.emit('message', {user:'admin', text:`${user.name}, welcome to room ${user.room}` })
     socket.broadcast.to(user.room).emit('message', {user:'admin'})
 })
 socket.on('disconnect',()=>{
     console.log('User had left!!!');
 })
});


app.use(router);
server.listen(PORT, ()=>{
    console.log(`Server has started on port ${PORT}`);
})