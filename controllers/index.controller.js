const indexController = (req, res, next) => {
    return res.status(200).json('Welcome to CRUD Battle');
};

module.exports = {
    indexController,
}