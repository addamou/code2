const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var constPediatriqueSchema = new mongoose.Schema({
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
    adresse: {
        type: String
    },
    maladieConnue: {
        type: String
    },
    motifConsultation: {
        type: String
    },
    poids: {
        type: Number
    },
    taille: {
        type: String
    },
    pc: {
        type: String
    },
    t: {
        type: Number
    },
    fr: {
        type: String
    },
    fc: {
        type: String
    },
    sao2: {
        type: String
    },
    ta: {
        type: String
    },
    examenPhysique: {
        type: String
    },
    bilanResultats: {
        type: String
    },
    diagnostic: {
        type: String
    },
    traitement: {
        type: String
    },
    rdv: {
        type: Date,
        default: Date.now
    },
    agent: {
        type: String
    }
});

//Export the model
module.exports = mongoose.model('consultationPediatrique', constPediatriqueSchema)