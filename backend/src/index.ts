import express from 'express';
import router from './routes';
import dotenv from 'dotenv';
import { createUserTable, createRoomTable } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

createUserTable();
createRoomTable();

//TODO: look into more details
// this allowed frontend to make a request to the backend
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/v1', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});