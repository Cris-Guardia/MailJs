const mongoose = require('mongoose');
const { Schema } = mongoose;

const mailSchema = new Schema({
    title: {type: String, required:true},
    description: {type: String, required:true},
    date: {type: Date, default: Date.now},
    mailBy: {type: String},
    mailFor: {type: String},
    user: {type: String}
});

module.exports = mongoose.model('Mail', mailSchema);