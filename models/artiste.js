const mongoose = require('mongoose');

const artisteSchema = new mongoose.Schema({
    image: String,
    nom: {type: String, require: true},
    nomScene: String,
    nbreAlbums: Number,
    rating: {type: Number, default: 0},
    reseauxSociaux: [String],
    label: String,
    maisonEdition: String,
    debutCarriere: Date
})

module.exports = mongoose.model('artiste', artisteSchema);