import { Server, Socket } from 'socket.io';

export function initializeSocket(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('connected:', socket.id);
 
    socket.on('message', (msg: string) => {
      console.log('received:', msg);
      io.emit('message', msg); // broadcast 
    });

    socket.on('disconnect', () => {
      console.log('disconnected:', socket.id);
    });
  });
}
