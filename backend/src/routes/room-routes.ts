import { Router } from 'express';
import connection from '../db';
import mysql from 'mysql2/promise';
import { isValidToken} from './jwt-helper';

const router = Router();

router.post('/create-room', async (req, res): Promise<void> => {
    if (!isValidToken(req.headers.authorization as string)){
        res.status(401).json({ error: 'Invalid token' });
      };
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
    if (!isValidToken(req.headers.authorization as string)){
        res.status(401).json({ error: 'Invalid token' });
      };
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

router.put('/exit-room', async (req, res): Promise<void> => {
    if (!isValidToken(req.headers.authorization as string)){
        res.status(401).json({ error: 'Invalid token' });
      };
    const { username, roomname } = req.body;
    const query = `
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