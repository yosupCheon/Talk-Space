import express from 'express';
import connection from './db';
import { RESERVED_EVENTS } from 'socket.io/dist/socket-types';
import { hostname } from 'os';
import mysql from 'mysql2/promise';

const router = express.Router();

router.post('/login', async (req, res): Promise<void> => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).json({ error: 'Failed to login (code 0000)' });
  }

  const query = 'SELECT username, password FROM user WHERE username=?';
  const [result]: any = await connection.query(query, [username]);
  if (result.length === 0) {
    res.status(400).json({ error: "Failed to login (code 0001)" });
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
 
router.post('/create-user', async (req, res): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' });
    return;
  }
  try {
    const query = 'INSERT INTO user (username, password) VALUES (?, ?)';
    const [result] = await connection.query(query, [username, password]);
    //TODO: delete result:result, now debugging purpose
    res.status(201).json({ message: 'Successfully User created!', result: result });
    return;
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
    return;
  }
});

router.post('/create-room', async (req, res): Promise<void> => {
  const { hostName, roomName } = req.body;
  const user = JSON.stringify([hostName]);
  try {
    const query = 'INSERT INTO room (users, room_name, occupied_count) VALUES (?, ?, ?)';
    const [result] = await connection.query(query, [user, roomName, 1]);
    res.status(200).json({ message: 'Successfully Room Created!', result: result })
    return;
  } catch (error) {
    res.status(400).json({ error: 'Failed to create a room' });
    return;
  }
});

router.put('/join-room', async (req, res): Promise<void> => {
  const { joinName, roomName } = req.body;
  try {
    const query = `
      UPDATE room 
      SET users = JSON_ARRAY_APPEND(COALESCE(users, '[]'), "$", ?), 
          occupied_count = occupied_count + 1 
      WHERE room_name = ?;
    `;
    const [result] = await connection.query(query, [joinName, roomName]);
    const metadata = result as mysql.ResultSetHeader;
    if (metadata.affectedRows === 1) {
      res.status(200).json({ message: 'Successfully added to the room!' });
      return;
    } else {
      res.status(400).json({ error: 'failed to added to a room (0001)' });
      return;
    }
  } catch (error) {
    res.status(400).json({ error: 'failed to added to a room (0002)' });
    return;
  }
});

router.put ('/exit-room', async (req, res): Promise<void> => {
  const {username, roomname} = req.body; 
  const query =`
    UPDATE room
    SET users = JSON_REMOVE(users, 
       JSON_UNQUOTE(JSON_SEARCH(users, 'one', ?, null, '$'))),
      occupied_count = occupied_count - 1
    WHERE room_name = ?;`;
  const [result] = await connection.query(query, [username, roomname]);
  const metadata = result as mysql.ResultSetHeader;
    if (metadata.affectedRows === 1) {
      res.status(200).json({ message: 'Successfully added to the room!' });
      return;
    } else {
      res.status(400).json({ error: 'failed to added to a room (0001)' });
      return;
    }
});


export default router;
