const http = require('http')
const express = require('express')
const cors = require('cors')
const socketio = require('socket.io')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')
const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())
app.use(router)

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.join(user.room)

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to room ${user.room}.`,
    })
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined!` })

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    })

    callback()
  })

  // Handle 'sendMessage' event with priority
  socket.on('sendMessage', (message, priority = 'normal', callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', {
        user: user.name,
        text: message,
        priority: priority, // include priority level in the message
    });

    callback();
  });

  // priority!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  const priorityQueue = []; // Holds messages with their priority

  socket.on('sendMessage', (message, priority = 'normal', callback) => {
    const user = getUser(socket.id);

    // Add message to queue with priority
    priorityQueue.push({
        user: user.name,
        room: user.room,
        text: message,
        priority: priority,
    });

    // Sort priorityQueue: urgent > high > normal
    priorityQueue.sort((a, b) => {
        const priorityLevels = { urgent: 3, high: 2, normal: 1 };
        return priorityLevels[b.priority] - priorityLevels[a.priority];
    });

    callback();
});

setInterval(() => {
  if (priorityQueue.length > 0) {
      // Dequeue the highest-priority message
      const { user, room, text, priority } = priorityQueue.shift();
      
      // Broadcast the message to the room
      io.to(room).emit('message', {
          user: user,
          text: text,
          priority: priority,
      });
  }
}, 100); // Adjust interval as needed (e.g., every 100 ms)


  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', {
        user: 'Admin',
        text: `${user.name} has left.`,
      })
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      })
    }
  })
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


