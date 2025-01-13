import { Router } from 'express';
import connection from '../db';  
import jwt from 'jsonwebtoken'; 
import { isValidToken} from './jwt-helper';
//import dotenv from 'dotenv';

const router = Router(); 
 

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
    var token = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET as string);
    res.status(200).json({ message: 'Successfully Login', token: token, result: result });
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
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
    console.log(error);
    return;
  }
  res.status(201).json({ message: 'Successfully User created!' });
});


router.put('/update-user', async (req, res): Promise<void> => {
  const { username, newPassword, } = req.body; 
  if (!isValidToken(req.headers.authorization as string)){
    res.status(401).json({ error: 'Invalid token' });
  };
  if (!username || !newPassword) {
    res.status(400).json({ error: 'Username and password are required' });
    return;
  }
  try {
    const query = 'UPDATE user SET password=? WHERE username=?';
    const [result] = await connection.query(query, [newPassword, username]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
    return;
  }
  res.status(200).json({ message: 'Successfully updated user' });
});

router.delete('/delete-user', async (req, res): Promise<void> => {
  const username = req.body.username;
  if (!isValidToken(req.headers.authorization as string)){
    res.status(401).json({ error: 'Invalid token' });
  };
  if (!username) {
    res.status(400).json({ error: 'Username is required' });
    return;
  }
  try {
    const query = 'DELETE FROM user WHERE username=?';
    const [result] = await connection.query(query, [username]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
    return;
  }
  res.status(200).json({ message: 'Successfully deleted user' });
});

export default router;