require('dotenv').config();
const express = require('express');
const prisma = require('./config/prisma');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const shipmentRoutes = require('./routes/shipmentRoutes');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/shipments', shipmentRoutes);
// Health check endpoint (yêu cầu đề bài)
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      error: error.message,
    });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'E-commerce API is running' });
});
app.use(errorHandler);
module.exports = app;