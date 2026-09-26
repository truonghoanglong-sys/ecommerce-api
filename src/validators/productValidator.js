const { z } = require('zod');

const createProductSchema = z.object({
  pname: z
    .string({ error: (issue) => (issue.input === undefined ? 'pname is required' : 'pname must be a string') })
    .min(1, 'pname is required'),
  price: z
    .number({ error: (issue) => (issue.input === undefined ? 'price is required' : 'price must be a number') })
    .positive('price must be positive'),
  quantity: z
    .number({ error: (issue) => (issue.input === undefined ? 'quantity is required' : 'quantity must be a number') })
    .int()
    .nonnegative('quantity must be >= 0'),
});

const updateProductSchema = createProductSchema.partial();

module.exports = { createProductSchema, updateProductSchema };