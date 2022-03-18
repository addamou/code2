const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var certificatAccouchementSchema = new mongoose.Schema({
    profession: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    mle: {
        type: String
    },
    dateAccouchement: {
        type: Date,
        default: Date.now
    },
    sexe: {
        type: String
    },
    prenom: {
        type: String
    },
    pere: {
        type: String,
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
module.exports = mongoose.model('certificatAccouchement', certificatAccouchementSchema);