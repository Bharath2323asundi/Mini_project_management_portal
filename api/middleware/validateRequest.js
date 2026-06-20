const { validationResult } = require('express-validator');

// Middleware to format express-validator errors consistently
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      // Format the errors into a simpler array of messages
      errors: errors.array().map(err => err.msg)
    });
  }
  next();
};

module.exports = validateRequest;
