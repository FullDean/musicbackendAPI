const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    email: { type: String, require: true },
    password: String
})

module.exports = mongoose.model('user', userSchema);