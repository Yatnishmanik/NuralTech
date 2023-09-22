// socket.js
const { Server } = require('socket.io');
let io;
// Initialize the Socket.io instance
const initSocketIO = (server) => {
  io = new Server(server);
  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};
module.exports = {initSocketIO,getIO,};
