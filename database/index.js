const debug = require('debug')('mdb:index')
const mongoose = require("mongoose");
const { MONGODB_CONFIG : DB } = require("../config");

// import all DB models
const models = require("./models");

mongoose.connect(`mongodb+srv://${DB.USERNAME}:${DB.PASSWORD}@${DB.HOST}/${DB.NAME}`, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        debug("Connected to MongoDB");
    })
    .catch((err) => {
        debug("Mongoose connection error: ", err);
        process.exit();
    });

mongoose.connection.on("error", (err) => {
    debug("Mongoose connection: " + err + " error");
});

mongoose.connection.on("disconnected", () => {
    debug("Mongoose connection has been disconnected");
});

module.exports = models;
