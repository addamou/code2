const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var ficheSchema = new mongoose.Schema({
    fiche: {
        type: String,
    },
    agent: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    bulletinId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bulletinExamen"
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient"
    }
});

//Export the model
module.exports = mongoose.model('fichenumeration', ficheSchema);