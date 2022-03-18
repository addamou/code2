const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var murGeantSchema = new mongoose.Schema({
    geant : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "accueil"
    }
});

//Export the model
module.exports = mongoose.model('tableauMedecin', murGeantSchema )