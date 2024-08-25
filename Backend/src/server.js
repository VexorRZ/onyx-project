import { createServer } from 'node:http';
import { Server } from 'socket.io';

import app from './app';

const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let onlineUsers = [];

const addNewUser = (userName, socketId) => {
  return (
    !onlineUsers.some((user) => user.name === userName) &&
    onlineUsers.push({ userName, socketId })
  );
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverName) => {
  return onlineUsers.find(({ userName }) => userName === receiverName);
};
io.on('connection', (socket) => {
  socket.on('newUser', (username) => {
    addNewUser(username.name, socket.id);
  });

  socket.on('disconnect', () => {
    removeUser(socket.id);
  });

  socket.on('sendNotification', ({ sender_name, receiver_name, type }) => {
    const receiver = getUser(receiver_name);

    io.to(receiver.socketId).emit('getNotification', {
      sender_name,
      type,
    });
  });

  io.emit('firstEvent', 'Hello this is test!');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3333, () => {
  console.log(`server running at http://localhost:${3333}`);
});
