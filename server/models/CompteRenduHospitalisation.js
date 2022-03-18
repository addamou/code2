const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var compteRenduHospitalisationSchema = new mongoose.Schema({
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
    sexe: {
        type: String
    },
    motifHospitalisation: {
        type: String
    },
    debutHospitalisation: {
        type: Date,
        default: Date.now
    },
    finHospitalisation: {
        type: Date,
        default: Date.now
    },

    medicale: {
        type: String
    },

    chururgical: {
        type: String
    },

    gynecoObstretrique: {
        type: String
    },

    familiers: {
        type: String
    },
    examenEntree: {
        type: String
    },
    t: {
        type: Number
    },
    ta: {
        type: String
    },
    poids: {
        type: Number
    },
    taille: {
        type: String
    },
    etatGeneral: {
        type: String
    },
    coeur: {
        type: String
    },
    poumons: {
        type: String
    },
    abd: {
        type: String
    },
    orl: {
        type: String
    },
    autresApp: {
        type: String
    },
    examenDemandes: {
        type: String
    },
    diagnosticRetenu: {
        type: String
    },
    conduiteTenir: {
        type: String
    },
    evolution: {
        type: String
    },
    agent: {
        type: String
    }
});

//Export the model
module.exports = mongoose.model('compteRenduHospitalisation', compteRenduHospitalisationSchema)