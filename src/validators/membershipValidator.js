const { z } = require('zod');

const createMembershipSchema = z.object({
  mname: z
    .string({ error: (issue) => (issue.input === undefined ? 'mname is required' : 'mname must be a string') })
    .min(1, 'mname is required'),
  score: z
    .number({ error: (issue) => (issue.input === undefined ? 'score is required' : 'score must be a number') })
    .int()
    .nonnegative('score must be >= 0'),
});

const updateMembershipSchema = createMembershipSchema.partial();

module.exports = { createMembershipSchema, updateMembershipSchema };