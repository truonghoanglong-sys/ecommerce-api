const prisma = require('../config/prisma');

async function getAllProducts() {
  return prisma.product.findMany();
}

async function getProductById(pid) {
  return prisma.product.findUnique({ where: { pid: Number(pid) } });
}

async function createProduct({ pname, price, quantity }) {
  return prisma.product.create({
    data: { pname, price, quantity },
  });
}

async function updateProduct(pid, { pname, price, quantity }) {
  return prisma.product.update({
    where: { pid: Number(pid) },
    data: { pname, price, quantity },
  });
}

async function deleteProduct(pid) {
  return prisma.product.delete({ where: { pid: Number(pid) } });
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};