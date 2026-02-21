import User from '../models/user.model.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const JWT_ALGORITHM = 'HS256';
const JWT_EXPIRATION = '1h';

const ARGON2_OPTIONS = {
  type: argon2.argon2id,
  timeCost: 3,
  memoryCost: 65536,
  parallelism: 4,
  hashLength: 32,
  raw: false,
};

if (
  !ARGON2_OPTIONS.type ||
  !ARGON2_OPTIONS.timeCost ||
  !ARGON2_OPTIONS.memoryCost
) {
  throw new Error('Invalid Argon2 configuration');
}

export const login = async ({ email, password }) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const user = await User.findOne({ email, active: true }).select('+password');
  if (!user) {
    const err = new Error('Credenciales inválidas');
    err.status = 401;
    throw err;
  }
  let isValidPassword;
  try {
    isValidPassword = await argon2.verify(user.password, password);
  } catch (error) {
    const err = new Error('Error al verificar credenciales');
    err.status = 500;
    throw err;
  }
  if (!isValidPassword) {
    const err = new Error('Credenciales inválidas');
    err.status = 401;
    throw err;
  }
  const needsRehash = await argon2.needsRehash(user.password, ARGON2_OPTIONS);
  if (needsRehash) {
    try {
      const newHash = await argon2.hash(password, ARGON2_OPTIONS);
      await User.findByIdAndUpdate(user._id, { password: newHash });
    } catch (error) {
      console.error('Error rehashing password:', error);
    }
  }
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
    algorithm: JWT_ALGORITHM,
  });
  const userObj = user.toObject();
  delete userObj.password;
  return { user: userObj, token };
};
