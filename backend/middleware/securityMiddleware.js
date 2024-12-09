const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

module.exports = (app) => {
    app.use(helmet());
    app.use(mongoSanitize());
};