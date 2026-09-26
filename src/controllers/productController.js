const productService = require('../services/productService');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { createProductSchema, updateProductSchema } = require('../validators/productValidator');

const getAll = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts();
  res.json(products);
});

const getById = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    throw new AppError('Invalid product id', 400);
  }
  const product = await productService.getProductById(id);
  if (!product) throw new AppError('Product not found', 404);
  res.json(product);
});

const create = asyncHandler(async (req, res) => {
  const parsed = createProductSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }
  const product = await productService.createProduct(parsed.data);
  res.status(201).json(product);
});

const update = asyncHandler(async (req, res) => {
  const parsed = updateProductSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 400);
  }
  const product = await productService.updateProduct(req.params.id, parsed.data);
  res.json(product);
});

const remove = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  res.status(204).send();
});

module.exports = { getAll, getById, create, update, remove };