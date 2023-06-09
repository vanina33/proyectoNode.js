const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { secretKey } = require('../config/passport');

// Login de usuario
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ error: info.message });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const token = jwt.sign(user.toJSON(), secretKey);
      return res.json({ token });
    });
  })(req, res, next);
});

module.exports = router;
