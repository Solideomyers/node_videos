import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SECRET = envs.JWT_SECRET;

export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET);
}
