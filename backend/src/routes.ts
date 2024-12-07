import express from 'express';
import connection from './db';
import { RESERVED_EVENTS } from 'socket.io/dist/socket-types';
import { hostname } from 'os';

const router = express.Router();

// Create a new user
router.post('/login', async (req, res): Promise<void> => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ error: 'Failed to login (code 0000)' }); 
  } 
 
  const query = 'SELECT username, password FROM user WHERE username=?';
  const [result]:any = await connection.query(query, [username]);
  if (result.length === 0) { 
    res.status(400).json({error: "Failed to login (code 0001)"});
    return;
  }
  const user = result[0];
  if (user.password === password) {
    res.status(200).json({ message: 'Successfully Login', result: result });  
    return;
  } else {
    res.status(500).json({ error: 'Failed to Login (code 0002)' });
    return;
  }
});

// Create a new user
router.post('/create-user',async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' }); 
  }
  try { 
    const query = 'INSERT INTO user (username, password) VALUES (?, ?)';
    const [result] = await connection.query(query, [username, password]);
    //TODO: delete result:result, now debugging purpose
    res.status(201).json({ message: 'Successfully User created!', result: result });
  } catch (error) { 
    res.status(500).json({ error: 'Failed to add user' });
  }
});

router.post('/create-room', async (req, res) => {
  const {hostName, roomName} = req.body;
  try {
    const query = 'INSERT INTO room (host_name, room_name, occupied_count) VALUES (?, ?, ?)';
    const [result] = await connection.query(query, [ hostName, roomName, 1]);
    res.status(200).json({message:'Successfully Room Created!', result:result})
  } catch (error) {
    res.status(400).json({error:'Failed to create a room'});
  }

});

router.put('/join-room', async (req, res) => {
  const {joinName, roomName} = req.body;
  try {
    const query = 'UPDATE room SET join_name = ? WHERE room_name= ?';
    const [result] = await connection.query(query, [joinName, roomName]);
    res.status(200).json({message:'Successfully added to the room!'});
  } catch (error) {
    res.status(400).json({error:'failed to added to a room'});
  }

});

export default router;
