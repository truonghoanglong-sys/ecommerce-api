const { registerUser, loginUser } = require('../services/authService');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { registerSchema, loginSchema } = require('../validators/authValidator');

const register = asyncHandler(async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }

  const user = await registerUser(parsed.data);

  res.status(201).json({
    message: 'Register successful',
    user: {
      uid: user.uid,
      username: user.username,
      fullname: user.fullname,
      roleid: user.roleid,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }

  const { user, token } = await loginUser(parsed.data);

  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      uid: user.uid,
      username: user.username,
      fullname: user.fullname,
      roleid: user.roleid,
    },
  });
});

module.exports = { register, login };