const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var certificatGrossesseSchema = new mongoose.Schema({

    nbreSemaine: {
        type: Number
    },
    nbreMois: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    datePrevu: {
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
    agent: {
        type: String
    }
});

//Export the model
module.exports = mongoose.model('certificatGrossesse', certificatGrossesseSchema);