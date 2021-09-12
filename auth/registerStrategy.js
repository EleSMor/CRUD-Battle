const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const { isValidPassword, isValidEmail } = require('./utils');

/**************************************
 * Register Strategy
 *************************************/

const registerStrategy = new LocalStrategy(
    {
        usernameField: 'alias',
        passwordField: 'password',
        passReqToCallback: true,
    },

    async (req, alias, password, done) => {
        try {
            const existingUser = await User.findOne({ alias });
            if (existingUser) {
                const error = new Error("Email is already registered")
                error.status = 400;
                return done(error);
            }

            // if (!isValidEmail(email)) {
            //     const error = new Error('Invalid email format');
            //     error.status = 400;
            //     return done(error);
            // }

            if (!isValidPassword(password)) {
                const error = new Error('Invalid password format')
                error.status = 400;
                return done(error);
            }

            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                name: req.body.name,
                password: passwordHash,
                email: req.body.email,
                alias,
            });

            const savedUser = await newUser.save();
            savedUser.password = null;

            return done(null, savedUser);

        } catch (error) {
            return done(error);
        }
    },
);


module.exports = registerStrategy;