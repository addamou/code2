const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var certificatMedicalSchema = new mongoose.Schema({
    constat: {
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
module.exports = mongoose.model('certificatMedical', certificatMedicalSchema)