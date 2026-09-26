const { z } = require('zod');

const createShipmentSchema = z.object({
  oid: z
    .number({ error: (issue) => (issue.input === undefined ? 'oid is required' : 'oid must be a number') })
    .int()
    .positive('oid must be positive'),
  status: z.string().optional(),
});

const updateStatusSchema = z.object({
  status: z
    .string({ error: (issue) => (issue.input === undefined ? 'status is required' : 'status must be a string') })
    .min(1, 'status is required'),
});

module.exports = { createShipmentSchema, updateStatusSchema };