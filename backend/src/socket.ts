import { Server, Socket } from 'socket.io';

export function initializeSocket(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('connected:', socket.id);
 
    socket.on('message', (msg: string) => {
      const realMsg = JSON.parse(JSON.stringify(msg));
      console.log('received:', realMsg['text']);
      const req = {"text":realMsg['text']+" from server"};
      io.emit('message', req); // broadcast 
    });

    socket.on('disconnect', () => {
      console.log('disconnected:', socket.id);
    });
  });
}
