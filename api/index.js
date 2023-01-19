const { query } = require('../db/client');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');

router.get('/health', async (req, res, next) => {
  try {
    const uptime = process.uptime();

    const {
      rows: [dbConnection],
    } = await query(`SELECT NOW();`);

    const currentTime = new Date();

    const lastRestart = new Intl.DateTimeFormat('en', {
      timestyle: 'long',
      dateStyle: 'long',
      timeZone: 'America/New_York',
    }).format(currentTime - uptime * 1000);

    res.send({
      message: 'The api is healthy!',
      uptime,
      dbConnection,
      currentTime,
      lastRestart,
    });
  } catch (error) {
    next(error);
  }
});

// set `req.user` if possible
router.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const parsedToken = jwt.verify(token, process.env.JWT_SECRET);

      const id = parsedToken && parsedToken.id;
      if (id) {
        req.user = await getUserById(id);
        next();
      } else {
        res.status(401);
        next({
          name: 'AuthorizationHeaderError',
          message: `Authorization token must start with ${prefix}`,
        });
      }
    } catch (error) {
      next(error);
    }
  }
});

router.use((req, res, next) => {
  if (req.user) {
    console.log('User is set:', req.user);
  }
  next();
});

// ROUTER: /api/users
const usersRouter = require('./users');
router.use('/users', usersRouter);

// place your routers here

module.exports = router;
