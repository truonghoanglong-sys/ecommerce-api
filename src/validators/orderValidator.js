const { z } = require('zod');

const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        pid: z.number({ error: 'pid must be a number' }).int().positive('pid must be positive'),
        qty: z.number({ error: 'qty must be a number' }).int().positive('qty must be positive'),
      })
    )
    .min(1, 'items must have at least 1 product'),
});

module.exports = { createOrderSchema };