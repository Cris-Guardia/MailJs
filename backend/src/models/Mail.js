const mongoose = require('mongoose');
const { Schema } = mongoose;

const MailSchema = new Schema({
    isSended: {type: Boolean, required: true},
    read: {type: Boolean, default: false},
    important: {type: Boolean, default: false},
    recycle: {type: Boolean, default: false},
    address: {type: String, required: true},
    date: {type: Date},
    title: {type: String},
    description: {type: String}
});

module.exports = MailSchema;