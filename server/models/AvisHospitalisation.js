const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var avisHospSchema = new mongoose.Schema({

    assurance: {
        type: String
    },
    numAssure: {
        type: String
    },
    nomAssure: {
        type: String
    },
    societe: {
        type: String
    },
    diagnostic: {
        type: String
    },
    dateHospitalisation: {
        type: Date,
        default: Date.now
    },

    dureeHospitalisation: {
        type: String
    },
    agent: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
});

//Export the model
module.exports = mongoose.model('avisHospitalisation', avisHospSchema);