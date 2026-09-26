const shipmentService = require('../services/shipmentService');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { createShipmentSchema, updateStatusSchema } = require('../validators/shipmentValidator');

const create = asyncHandler(async (req, res) => {
  const parsed = createShipmentSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }
  const shipment = await shipmentService.createShipment(parsed.data);
  res.status(201).json(shipment);
});

const updateStatus = asyncHandler(async (req, res) => {
  const parsed = updateStatusSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }
  const shipment = await shipmentService.updateShipmentStatus(req.params.shipid, parsed.data.status);
  res.json(shipment);
});

const getByOrder = asyncHandler(async (req, res) => {
  const orderId = Number(req.params.orderId);
  if (!Number.isInteger(orderId)) {
    throw new AppError('Invalid order id', 400);
  }
  const shipments = await shipmentService.getShipmentsByOrder(orderId, req.user);
  res.json(shipments);
});

module.exports = { create, updateStatus, getByOrder };