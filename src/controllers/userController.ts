import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userRepository = getRepository(User);
  const user = userRepository.create({ username, password: hashedPassword });

  await userRepository.save(user);

  res.status(201).send('User registered successfully');
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { username } });

  if (!user) return res.status(400).send({ error: 'Invalid username or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send({ error: 'Invalid username or password' });

  const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
};
