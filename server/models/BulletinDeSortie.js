const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var BulletinDeSortieSchema = new mongoose.Schema({
    visiteRetour: {
        type: Date,
        default: Date.now
    },
    ordonnanceSortie1: {
        type: String,
    },
    ordonnanceSortie2: {
        type: String,
    },
    ordonnanceSortie3: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    dateSortie: {
        type: Date,
        default: Date.now
    },
    diagnosticRetenu: {
        type: String
    },
    dureeHospitalisation: {
        type: String
    },
    finPeriode: {
        type: Date,
        default: Date.now
    },
    debutPeriode: {
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
    motifHospitalisation: {
        type: String
    },
    agent: {
        type: String
    },
});

//Export the model
module.exports = mongoose.model('bulletinDeSortie', BulletinDeSortieSchema);