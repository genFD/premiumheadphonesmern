import express from 'express';
import path from 'path';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import uploadRoutes from './routes/uploadRoutes.js';
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
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   );
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....');
//   });
// }

const PORT = process.env.PORT || 8000;
app.listen(
  PORT,
  console.log(
    `SERVER RUNNING IN ${process.env.NODE_ENV} MODE ON PORT ${PORT}`.green
      .underline.bold
  )
);
