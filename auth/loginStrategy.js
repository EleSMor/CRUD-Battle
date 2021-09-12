const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User.model');
const bcrypt = require('bcrypt');

/**************************************
 * Login Strategy
 *************************************/

const loginStrategy = new LocalStrategy(
    {
        usernameField: 'alias',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, alias, password, done) => {
        try {

            let existingUser = await User.findOne({ alias });

            if (!existingUser) {
                const error = new Error("Alias doesn't exist");
                error.status = 401;
                return done(error, null);
            }

            const isValidPassword = await bcrypt.compare(password, existingUser.password);

            if (!isValidPassword) {
                const error = new Error("Incorrect password. Try again");
                return done(error, null);
            }

            existingUser.password = null;
            return done(null, existingUser);

        } catch (error) {
            return done(error, null);
        }
    },
);

module.exports = loginStrategy;