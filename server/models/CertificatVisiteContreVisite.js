const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var CertificatVisiteContreVisiteSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    justification1: {
        type: String
    },
    justification2: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    createdBy2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
});

//Export the model
module.exports = mongoose.model('certificatVisiteContreVisite', CertificatVisiteContreVisiteSchema)