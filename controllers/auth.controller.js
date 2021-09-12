const passport = require('passport');

const registerGet = (req, res, next) => {
    return res.status(200).json(res);
}

const registerPost = (req, res, next) => {

    const { name, password, email, alias } = req.body;
    console.log('Register ->', req.body)

    if (!name || !password || !email || !alias) {
        const error = new Error('Complete fields');
        return res.json(error);
    }

    const done = (error, user) => {

        if (error) {
            return next(error);
        };

        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            };
            return res.json(user);
        });
    };

    passport.authenticate('register', done)(req);
};

const loginGet = (req, res, next) => {
    return res.status(200).json(res);
};

const loginPost = (req, res, next) => {
    // console.log('Login ->', req.body)

    const done = (error, user) => {
        if (error) return next(error);

        const doneForSerialize = (error) => {
            if (error) return next(error);
            return res.json(user);
        };
        req.logIn(user, doneForSerialize);
    };
    passport.authenticate('login', done)(req);
};

const logoutPost = (req, res, next) => {
    if (req.user) {
        req.logout();

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.json('Logged out');
        });
    } else {
        return res.status(200).json("No user logged in")
    };
};

const checkSession = async (req, res, next) => {
    if (req.user) {
        let userRegister = req.user;
        userRegister.password = null;

        return res.status(200).json(userRegister);
    } else {
        return res.status(401).json({message: 'No user found'});
    };
}
module.exports = {
    registerGet,
    registerPost,
    loginGet,
    loginPost,
    logoutPost,
    checkSession,
}