import express from 'express';
import connection from './db';

const router = express.Router();

// Create a new user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'Username and password are required' }); 
  } 

  try {
  const query = 'SELECT username, password FROM user WHERE username=?';
  const [result]:any = await connection.query(query, [username]);
  if (result.length === 0) { 
    res.status(400).json({message: "Invalid username or password 1"});
  }
  const user = result[0];
  if (user.password === password) {
    res.status(200).json({ message: 'Successfully Login', result: result });  
  } else {
    res.status(500).json({ error: 'Failed to Login' });
  } } catch (error) { 
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
