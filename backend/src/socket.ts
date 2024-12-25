import { Server, Socket } from 'socket.io';

export function initializeSocket(io: Server) {
  io.on('connection', (socket) => {
    //console.log('A user connected:', socket.id);
  
    // Join a specific room
    socket.on('join-room', (roomName: string) => {
      socket.join(roomName);
      // Notify the room about the new user
      socket.to(roomName).emit('user-joined', `User ${socket.id} joined the room`);
    });
  
    // Handle messages in a room
    socket.on('send-message', ({ roomName, message }) => {
      io.to(roomName).emit('receive-message', { message, sender: socket.id });
    });
  
    // Handle disconnect
    socket.on('disconnect', () => {
      //console.log('User disconnected:', socket.id);
    });
  });
}