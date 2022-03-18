const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var offreSchema = new mongoose.Schema({

    label: {
        type: String
    },

    poste: {
        type: String
    },

    date: {
        type: Date,
        default: Date.now
    }
});

//Export the model
module.exports = mongoose.model('offres', offreSchema);