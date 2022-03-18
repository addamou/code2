const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var echoVesicoProstatiqueSchema = new mongoose.Schema({
    renseignementClinique: {
        type: String
    },

    prostate: {
        type: String
    },
    vesiculeSeminale: {
        type: String
    },
    vessie: {
        type: String
    },
    volumeVesical: {
        type: String
    },
    paroisVesicale: {
        type: String
    },
    residuPostMictionnel: {
        type: String
    },
    reins: {
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
module.exports = mongoose.model('echoVesicoProstatique', echoVesicoProstatiqueSchema)