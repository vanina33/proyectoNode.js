const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { secretKey } = require('./database');

const User = require('../models/user');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'name',
      passwordField: 'password',
    },
    (name, password, done) => {
      User.findOne({ where: { name } })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'Nombre de usuario incorrecto' });
          }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Contraseña incorrecta' });
            }
          });
        })
        .catch((err) => done(err));
    }
  )
);

module.exports = { secretKey };
