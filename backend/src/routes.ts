import express from 'express';
import connection from './db';

const router = express.Router();

// Create a new user
router.post('/login',async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' }); 
  }
  try {
    const query = 'SELECT * FROM user WHERE username=? AND password=?';
    const result = await connection.query(query, [username, password]);
    //TODO: delete result:result, now debugging purpose
    res.status(200).json({ message: 'Successfully Login', result: result });
  } catch (error) { 
    res.status(500).json({ error: 'Failed to Login' });
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

export default router;
