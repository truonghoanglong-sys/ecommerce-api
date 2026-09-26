const membershipService = require('../services/membershipService');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { createMembershipSchema, updateMembershipSchema } = require('../validators/membershipValidator');

const getAll = asyncHandler(async (req, res) => {
  const memberships = await membershipService.getAllMemberships();
  res.json(memberships);
});

const create = asyncHandler(async (req, res) => {
  const parsed = createMembershipSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }
  const membership = await membershipService.createMembership(parsed.data);
  res.status(201).json(membership);
});

const update = asyncHandler(async (req, res) => {
  const parsed = updateMembershipSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }
  const membership = await membershipService.updateMembership(req.params.id, parsed.data);
  res.json(membership);
});

const remove = asyncHandler(async (req, res) => {
  await membershipService.deleteMembership(req.params.id);
  res.status(204).send();
});

module.exports = { getAll, create, update, remove };