const Artiste = require('../models/artiste');
const Rating = require('../models/rating');

// Récupérer tous les artistes
exports.getArtistes = async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        const search = req.query.search || '';
        // Calcul des paramètres de pagination
        const limit = size;
        const skip = (page - 1) * size;

        // Recherche conditionnelle (par nom ou nom de scene)
        const query = search ? { $or: [{nom: new RegExp(search, 'i')}, {nomScene: new RegExp(search, 'i')}]} : {};

        // Récupération des artistes paginés
        const result = await Artiste.find(query).skip(skip).limit(limit);

        // Total d'artistes corresppndant à la recherche
        const total = await Artiste.countDocuments(query)

        console.log(result);
        if(result){
            res.status(200).json({
                result,
                total,
                totalPages: Math.ceil(total /size), // Nombre total de pages
                currentPage: page, // Page actuelle
            });
        }else{
            res.status(400).json({message: "No artistes found"});
        }
    }catch(e){
        console.error(e);
        res.status(500).json({msg: "Internal server error"});
    }
}


// Récupérer un seul artiste
exports.getOneArtiste = async(req, res) => {
    try{
        const {id} = req.params;
        const artiste = await Artiste.findOne({_id: id});
        if(artiste){
            res.status(200).json({artiste});
        }else{
            res.status(404).json({msg: "Artiste introuvable"});
        }

    }
    catch(e) {
        console.error(e);
        res.status(500).json({msg: "Internal server error"});
    }
}

// Ajouter un artiste
exports.createArtiste = async(req, res) => {
    try{
        const {image, nom, nomScene, nbreAlbums, rating, reseauxSociaux, label, maisonEdition, debutCarriere } = req.body;
        const newArtiste = new Artiste({
            image: image,
            nom : nom, 
            nomScene :  nomScene, 
            nbreAlbums : nbreAlbums, 
            rating : rating, 
            reseauxSociaux : reseauxSociaux, 
            label : label, 
            maisonEdition : maisonEdition, 
            debutCarriere : debutCarriere
        })
        console.log(req.body);

        await newArtiste.save();
        res.status(201).json({msg: "Nouvel Artiste enregistré avec succès !"});
    }
    catch(e){
        console.error(e);
        res.status(500).json({msg: "Internal server error"});
    }
}

// Update un artiste
exports.updateArtiste = async(req, res) => {
    try{
        const {id} = req.params;
        const updateData = req.body

        const updatedArtiste = await Artiste.findByIdAndUpdate({_id: id}, updateData, {new: true});
        if(this.updateArtiste){
            res.status(200).json({msg: "Artiste modifié avec succès !", updatedArtiste});
        }else{
            res.status(404).json({msg: "Artiste introuvable"});
        }
    } catch(e){
        console.error(e);
        res.status(500).json({msg: "Internal server error"});
    }
}

// Supprimer un artiste
exports.deleteArtiste = async(req, res) => {
    try {
        const {id} = req.params

        const deteledArtiste = await Artiste.findByIdAndDelete({_id : id});
        if(deteledArtiste){
            res.status(200).json({msg: "Artiste supprimé avec succès !"});
        }else{
            res.status(404).json({msg: "Artiste introuvable"});
        }
    } catch (error) {
        console.error(e);
        res.status(500).json({ msg: "Internal server error" });
    }
}


// AJouter une note
exports.addNote = async(req, res) => {
    try {
        const {id} = req.params;
        const { note } = req.body;
        const newRating = new Rating({
            note: note,
            artiste: id
        });
        console.log(req.body);

        await newRating.save();
        res.status(201).json({msg: "Nouvelle note ajoutée avec succès !"});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: "Internal server error"});
    }
}