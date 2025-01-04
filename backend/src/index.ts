//import routers from './routes/routes';
import routerUser from './routes/user-routes';
import routerRoom from './routes/room-routes';
import dotenv from 'dotenv';
import { createUserTable, createRoomTable } from './db';
import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { initializeSocket } from './socket';
import cors from 'cors';

dotenv.config(); 

const app = express(); 
app.use(cors()); 
app.use(express.json());
app.use('/v1', routerUser);
app.use('/v1', routerRoom);
 
//Socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",//"http://localhost:3000",  
    methods: ["GET", "POST"],         
    credentials: false//true
  }
});
initializeSocket(io);

//TODO: not app listen, but server
const PORT = process.env.PORT;
server.listen(PORT, () =>
  {console.log(`Server is running on http://localhost:${PORT}`);});
