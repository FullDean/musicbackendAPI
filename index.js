const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 3000;


require('./config/dbConnection');

app.get('/', (req, res) => {
    res.send("API Working !");
});


const artistes = require("./routes/artiste");
const uploadImage = require('./controller/uploadController')

app.use(cors());
app.use("/api", artistes);
app.use("/api", uploadImage);


app.listen(PORT, (err) => {
    if (err) {
        console.error("Erreur lors du démarrage du serveur :", err);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
