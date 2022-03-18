const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var dossierSchema = new mongoose.Schema({
    sexe: {
        type: String
    },
    adresse: {
        type: String
    },
    assure: {
        type: String
    },
    numPolice: {
        type: String
    },
    numAssure: {
        type: String
    },
    medecin: {
        type: String
    },
    entree: {
        type: Date,
        default: Date.now
    },
    sortie: {
        type: Date,
        default: Date.now
    },
    chambre: {
        type: String
    },
    motifConsultation: {
        type: String
    },
    histoireMaladie: {
        type: String
    },
    medicale: {
        type: String
    },
    chirurgical: {
        type: String
    },
    gynecoObstetrique: {
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
    resume: {
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
    observations: {
        type: String
    },
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
    examensUlterieurs: [{}],
    agent: {
        type: String
    }
});

//Export the model
module.exports = mongoose.model('dossierMedical', dossierSchema)