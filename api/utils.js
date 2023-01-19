const { UnauthorizedError } = require('../errors');

function requireUser(req, res, next) {
  if (!req.user) {
    res.status(401);
    next({
      name: 'UnauthorizedError',
      message: UnauthorizedError(),
    });
  }

  next();
}

module.exports = {
  requireUser,
};
