const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt  = require('bcryptjs');
const MailSchema = require('./Mail');

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    dateBirth: {type: Date, required: true},
    password: {type: String, required: true},
    mails: [MailSchema]
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(15);
    const hash = bcrypt.hash(password, salt);
    return hash;
}

UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);