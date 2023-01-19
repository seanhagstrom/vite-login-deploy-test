/* eslint-disable no-useless-catch */
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {
  createUser,
  getUserByUsername,
  getUser,
  getPublicRoutinesByUser,
  getAllRoutinesByUser,
} = require('../db');
const {
  UserTakenError,
  PasswordTooShortError,
  UserDoesNotExistError,
} = require('../errors');
const { requireUser } = require('./utils');

// POST /api/users/register
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const findUser = await getUserByUsername(username);

    if (findUser) {
      res.status(401);
      next({
        name: 'UserTakenError',
        message: UserTakenError(username),
      });
    } else if (password.length < 8) {
      res.status(401);
      next({
        name: 'PasswordTooShortError',
        message: PasswordTooShortError(),
      });
    } else {
      const user = await createUser({ username, password });
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1w' }
      );
      res.send({ user, message: "I'm here!", token });
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/users/login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUser({ username, password });
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1w' }
    );
    res.send({ user, message: "you're logged in!", token });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/me
router.get('/me', requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:username/routines
router.get('/:username/routines', requireUser, async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);

    if (!user) {
      res.status(401);
      next({
        name: 'UserDoesNotExistError',
        message: UserDoesNotExistError(),
      });
    } else if (req.user.id === user.id) {
      const routines = await getAllRoutinesByUser({ username });

      res.send(routines);
    } else {
      const routines = await getPublicRoutinesByUser({ username });

      res.send(routines);
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
