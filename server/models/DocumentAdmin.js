const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var documentSchema = new mongoose.Schema({
    titre: {
        type: String,
    },
    document: {
        type: String,
    },
    nom: {
        type: String,
    },
    prenom: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    agent: {
        type: String
    }
});

//Export the model
module.exports = mongoose.model('documentAdministratif', documentSchema);