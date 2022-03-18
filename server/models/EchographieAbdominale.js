const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var echographieAbdominaleSchema = new mongoose.Schema({
    indications: {
        type: String
    },

    lobeDroit: {
        type: String
    },
    lobeGauche: {
        type: String
    },
    flecheHepatique: {
        type: String
    },

    echostructure: {
        type: String
    },

    contours: {
        type: String
    },

    autres: {
        type: String
    },

    tpvh: {
        type: String
    },
    vesiculeBiliaire: {
        type: String
    },

    taillePancreas: {
        type: String
    },
    echostructurePancreas: {
        type: String
    },

    contoursPancreas: {
        type: String
    },

    autresPancreas: {
        type: String
    },

    tailleRate: {
        type: String
    },
    echostructureRate: {
        type: String
    },

    contoursRate: {
        type: String
    },

    autresRate: {
        type: String
    },

    tailleDroitReins: {
        type: String
    },
    echostructureDroitReins: {
        type: String
    },
    cavitePyelocalicielleDroit: {
        type: String
    },

    tailleGaucheReins: {
        type: String
    },
    echostructureGaucheReins: {
        type: String
    },
    cavitePyelocalicielleGauche: {
        type: String
    },

    contoursVessie: {
        type: String
    },
    contenuVessie: {
        type: String
    },
    paroisVessie: {
        type: String
    },
    mesureParoisVessie: {
        type: String
    },

    conclusion: {
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
    agent: {
        type: String
    }
});

//Export the model
module.exports = mongoose.model('echographieAbdominale', echographieAbdominaleSchema)