import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import aiRoutes from './routes/ai.js';
import reviewRoutes from './routes/reviews.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/ai', aiRoutes);
app.use('/reviews', reviewRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('FuturePath API is running');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
