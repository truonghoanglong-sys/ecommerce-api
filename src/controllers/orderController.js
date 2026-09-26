const orderService = require('../services/orderService');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { createOrderSchema } = require('../validators/orderValidator');

const create = asyncHandler(async (req, res) => {
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }

  const order = await orderService.createOrder(req.user.uid, parsed.data.items);
  res.status(201).json(order);
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getMyOrders(req.user.uid);
  res.json(orders);
});

const getById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    throw new AppError('Invalid order id', 400);
  }

  const order = await orderService.getOrderById(id, req.user.uid);
  if (!order) throw new AppError('Order not found', 404);
  res.json(order);
});

module.exports = { create, getMyOrders, getById };