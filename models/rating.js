const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    note: {type: Number, require: true},
    artiste: String,
    user: String
})

module.exports = mongoose.model('rating', ratingSchema);
