const prisma = require('../config/prisma');
const AppError = require('../utils/AppError');

async function createOrder(uid, items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new AppError('items must be a non-empty array', 400);
  }

  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: { uid },
    });

    for (const item of items) {
      const { pid, qty } = item;

      if (!pid || !qty || qty <= 0) {
        throw new AppError('Each item must have valid pid and qty', 400);
      }

      const product = await tx.product.findUnique({ where: { pid: Number(pid) } });

      if (!product) {
        throw new AppError(`Product ${pid} not found`, 404);
      }

      if (product.quantity < qty) {
        throw new AppError(`Product ${product.pname} out of stock (available: ${product.quantity})`, 409);
      }

      await tx.orderDetail.create({
        data: {
          oid: order.oid,
          pid: product.pid,
          qty,
          unitPrice: product.price,
        },
      });

      await tx.product.update({
        where: { pid: product.pid },
        data: { quantity: { decrement: qty } },
      });
    }

    return tx.order.findUnique({
      where: { oid: order.oid },
      include: { orderDetails: true },
    });
  });
}

async function getMyOrders(uid) {
  return prisma.order.findMany({
    where: { uid },
    include: { orderDetails: true },
    orderBy: { createat: 'desc' },
  });
}

async function getOrderById(oid, uid) {
  const order = await prisma.order.findUnique({
    where: { oid: Number(oid) },
    include: { orderDetails: true },
  });

  if (!order) return null;
  if (order.uid !== uid) {
    throw new AppError('Forbidden: not your order', 403);
  }

  return order;
}

module.exports = { createOrder, getMyOrders, getOrderById };