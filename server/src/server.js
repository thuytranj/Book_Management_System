import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes.js';
  

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});