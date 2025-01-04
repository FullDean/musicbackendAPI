const express = require('express');
const router = express.Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../middleware/multer');

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        // Vérifier si un fichier a été téléchargé
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Aucun fichier n'a été téléchargé.",
            });
        }

        // Uploader le fichier sur Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Répondre avec succès
        res.status(200).json({
            success: true,
            message: "Image téléchargée avec succès !",
            data: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Erreur lors du téléchargement de l'image.",
            error: err.message,
        });
    }
});

module.exports = router;
