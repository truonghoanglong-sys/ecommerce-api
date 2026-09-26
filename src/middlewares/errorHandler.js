function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || 500;

  // Không lộ chi tiết kỹ thuật nội bộ ra ngoài khi lỗi không xác định (500)
  const message = statusCode === 500 && process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(statusCode).json({ message });
}

module.exports = errorHandler;