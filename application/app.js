'use strict';

// Modules
const SwaggerExpressMW = require('swagger-express-mw');
const Express = require('express');
const ExpressValidator = require('express-validator');
const Dotenv = require('dotenv').config();

// Imports
const i18n = require('./api/helpers/i18n.js');
const error_handler = require('./api/helpers/error-handler.js');

// Application (Framework)
var app = Express();

// Application interface
module.exports = app;

// SwaggerExpressMW configuration
const express_config = {
    appRoot: __dirname
};

SwaggerExpressMW.create(express_config, function(error, swaggerExpress) {
    if(error) { throw error; }

    process.on('unhandledRejection', error_handler.rejection);
    process.on('uncaughtException', error_handler.exception);

    // Express Validator
    app.use(ExpressValidator());

    // Swagger UI
    var swaggerUiUrl = process.env.SWAGGERUI_URL || '/docs';
    var swaggerUiAPIDocs = process.env.SWAGGERUI_APIDOCS || '/api-docs';
    var swaggerUiDir = process.env.SWAGGERUI_DIR || 'public';
    app.use(swaggerExpress.runner.swaggerTools.swaggerUi({
        'swaggerUi': swaggerUiUrl,
        'apiDocs': swaggerUiAPIDocs,
        'swaggerUiDir': swaggerUiDir
    }));

    // Middleware
    swaggerExpress.register(app);

    var port = process.env.SERVER_PORT || 3000;
    const server = app.listen(port);
});
