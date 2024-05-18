module.exports = (err, req, res, next) => {
  // console.error(err.stack);
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const data = err.data || null;
  res.status(status).json({ message: message, data: data });
};
