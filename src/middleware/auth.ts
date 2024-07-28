import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

interface AuthRequest extends Request {
  user?: User;
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret') as { userId: number };
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id: decoded.userId } });
    if (!user) return res.status(401).send('Unauthorized');

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

export default auth;
