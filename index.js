const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('./auth')
const cors = require('cors');

const db = require('./db');
const indexRoutes = require('./routes/index.routes');
const authRoutes = require('./routes/auth.routes');
const charactersRoutes = require('./routes/characters.routes');

db.connect();
const PORT = process.env.PORT || 3000;

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return next();
});

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 24 * 3600 * 1000,
    },
    store: MongoStore.create({ mongoUrl: db.DB_URL }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Endpoints
 */
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/characters', charactersRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})