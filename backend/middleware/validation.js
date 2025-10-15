// Input validation middleware

export const validatePermissionGroup = (req, res, next) => {
  const { groupName, userType, type } = req.body;

  const errors = [];

  if (!groupName || groupName.trim().length === 0) {
    errors.push('Group name is required');
  }

  if (!userType || userType.trim().length === 0) {
    errors.push('User type is required');
  }

  if (type && !['Static', 'Dynamic'].includes(type)) {
    errors.push('Type must be either Static or Dynamic');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors
    });
  }

  next();
};

export const validateUser = (req, res, next) => {
  const { userId, name, email } = req.body;

  const errors = [];

  if (!userId || userId.trim().length === 0) {
    errors.push('User ID is required');
  }

  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  }

  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Invalid email format');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors
    });
  }

  next();
};

export const validateRole = (req, res, next) => {
  const { role_id, name, userType } = req.body;

  const errors = [];

  if (role_id !== undefined && (typeof role_id !== 'number' || role_id < 1)) {
    errors.push('Role ID must be a positive number');
  }

  if (!name || name.trim().length === 0) {
    errors.push('Role name is required');
  }

  if (!userType || userType.trim().length === 0) {
    errors.push('User type is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors
    });
  }

  next();
};
