const { z } = require('zod');

const registerSchema = z.object({
  username: z
    .string({ error: (issue) => (issue.input === undefined ? 'username is required' : 'username must be a string') })
    .min(3, 'username must be at least 3 characters'),
  fullname: z
    .string({ error: (issue) => (issue.input === undefined ? 'fullname is required' : 'fullname must be a string') })
    .min(1, 'fullname is required'),
  password: z
    .string({ error: (issue) => (issue.input === undefined ? 'password is required' : 'password must be a string') })
    .min(6, 'password must be at least 6 characters'),
});

const loginSchema = z.object({
  username: z.string({ error: (issue) => (issue.input === undefined ? 'username is required' : 'username must be a string') }),
  password: z.string({ error: (issue) => (issue.input === undefined ? 'password is required' : 'password must be a string') }),
});

module.exports = { registerSchema, loginSchema };