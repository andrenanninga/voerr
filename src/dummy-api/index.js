'use strict';

var mock = require('json-api-generator');
var helpers = require('./helpers.js');

mock({
    templateDir: __dirname + '/templates/',

    address: '0.0.0.0',

    // We create a helper that will return one of the values Project, Office or Trip.
    helpers: helpers,

    // We wish to see when the resource is requested in the terminal
    log: true,

    // We also with that the browser should be opened to the correct url when starting the server
    open: false,
});
