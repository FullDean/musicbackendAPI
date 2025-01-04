const express = require("express");
const router = express.Router();
const artisteController = require('../controller/artisteController');
const bodyparser = require('body-parser');
const jsonParser = bodyparser.json();

// Récupérer tous les Artistes
router.get("/artistes", artisteController.getArtistes);

// Récupérer un seul artiste à partir de son id
router.get("/artiste/:id", artisteController.getOneArtiste);

// Créer un Artiste
router.post("/artiste", jsonParser ,artisteController.createArtiste);

// Modifier un artiste
router.put("/artiste/:id", jsonParser, artisteController.updateArtiste);

// Supprimer un artiste
router.delete("/artiste/:id", artisteController.deleteArtiste);

module.exports = router;