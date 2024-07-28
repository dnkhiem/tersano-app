import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import { User } from './entities/User';
import { Product } from './entities/Product';

const app = express();

app.use(cors());
app.use(express.json());

createConnection({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [User, Product],
  synchronize: true,
  logging: true,
}).then(() => {
  console.log('Connected to SQLite database');

  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(error => console.log(error));
