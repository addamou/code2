const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var moduleSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    perception: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "accueil"
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
    avisHospitalisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "avisHospitalisation"
    },
    bulletinDeSortie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bulletinDeSortie"
    },
    bulletinExamen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bulletinExamen"
    },
    certificatAccouchement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "certificatAccouchement"
    },
    certificatGrossesse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "certificatGrossesse"
    },
    certificatMedical: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "certificatMedical"
    },
    certificatVisiteMedicale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "certificatVisiteMedicale"
    },
    certificatVisiteContreVisite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "certificatVisiteContreVisite"
    },
    compteRenduAccouchement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "compteRenduAccouchement"
    },
    compteRenduHospitalisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "compteRenduHospitalisation"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    decharge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "decharge"
    },
    declarationGrossesse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "declarationGrossesse"
    },
    dossier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dossierMedical"
    },
    echographieAbdominale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "echographieAbdominale"
    },
    echoVesicoProstatique: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "echoVesicoProstatique"
    },
    ficheTemperature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ficheTemperature"
    },
    soinsUrgence: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "soinsUrgence"
    },
    consultationGeneral: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "consultationGenerale"
    },
    consultationPediatrique: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "consultationPediatrique"
    },

    imagerie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "imagerie"
    },

    ordonnances: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ordonnance'
        }
    ],
});

//Export the model
module.exports = mongoose.model('module', moduleSchema)