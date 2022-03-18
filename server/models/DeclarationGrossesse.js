const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var declarationGrossesseSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
    nombreMois: {
        type: Number
    },
    mari: {
        type: String
    },
    numSecuriteSociale: {
        type: String
    },
    profession: {
        type: String
    },
    nomEmployeur: {
        type: String
    },
    delivree: {
        type: String
    },
    demeure: {
        type: String
    },
    agent: {
        type: String
    }
});

//Export the model
module.exports = mongoose.model('declarationGrossesse', declarationGrossesseSchema)