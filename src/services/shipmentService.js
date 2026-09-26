const prisma = require('../config/prisma');
const AppError = require('../utils/AppError');

async function createShipment({ oid, status }) {
  const order = await prisma.order.findUnique({ where: { oid: Number(oid) } });
  if (!order) {
    throw new AppError('Order not found', 404);
  }

  return prisma.shipment.create({
    data: { oid: Number(oid), status: status || 'pending' },
  });
}

async function updateShipmentStatus(shipid, status) {
  return prisma.shipment.update({
    where: { shipid: Number(shipid) },
    data: { status },
  });
}

async function getShipmentsByOrder(oid, requester) {
  const order = await prisma.order.findUnique({ where: { oid: Number(oid) } });

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  // Chỉ chủ đơn hàng hoặc admin (roleid = 1) mới xem được
  if (order.uid !== requester.uid && requester.roleid !== 1) {
    throw new AppError('Forbidden: not your order', 403);
  }

  return prisma.shipment.findMany({ where: { oid: Number(oid) } });
}

module.exports = { createShipment, updateShipmentStatus, getShipmentsByOrder };