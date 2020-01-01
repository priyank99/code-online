const mongoose = require("mongoose");
const {Language}= require('./languages');

const sharedCodeSchema = new mongoose.Schema({
    url: {
        type: String,
    },
    language: {
        type: String,
        enum: Object.values(Language),
    },
    code_text: {
        type: String,
        default: ''
    },
    stdin: {
        type: String,
        default: ''
    },
    stdout: {
        type: String,
        default: ''
    },
    creation_timestamp: {
        type: Date,
        default: Date.now
    },
});
Object.assign(sharedCodeSchema.statics, {
    Language,
});

module.exports = mongoose.model("sharedCode", sharedCodeSchema);
