const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');
const AppError = require('../utils/AppError');

const SALT_ROUNDS = 10;

async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
}

async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

function generateToken(user) {
  return jwt.sign(
    { uid: user.uid, roleid: user.roleid },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
}

async function registerUser({ username, fullname, password }) {
  const existing = await prisma.user.findFirst({ where: { username } });
  if (existing) {
    throw new AppError('Username already exists', 409);
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      username,
      fullname,
      password: hashedPassword,
      roleid: 2, // customer mặc định
    },
  });

  return user;
}

async function loginUser({ username, password }) {
  const user = await prisma.user.findFirst({ where: { username } });
  if (!user) {
    throw new AppError('Invalid username or password', 401);
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid username or password', 401);
  }

  const token = generateToken(user);
  return { user, token };
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  registerUser,
  loginUser,
};