const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/crud-battle';

const connect = async () => {
    try {
        const db = await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        const { name, host } = db.connection;
        console.log(`Connected to the database ${name} in host ${host}`);
    } catch (error) {
        console.log('Ha ocurrido un error conectando a la base de datos.', error);
    }
}

module.exports = {
    DB_URL,
    connect
}