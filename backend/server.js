import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

connectDB();
const app = express();
app.use(express.json());

dotenv.config();
app.get('/', (req, res) => {
  res.send('api is runningfejhfjfedf');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 8000;
app.listen(
  PORT,
  console.log(
    `SERVER RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${PORT}`.green
      .underline.bold
  )
);
