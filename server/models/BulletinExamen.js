const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var bulletinExamenSchema = new mongoose.Schema({
    data: {},
    date: {
        type: Date,
        default: Date.now
    },
    medecin: {
        type: String
    },
    laborantin: {
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
module.exports = mongoose.model('bulletinExamen', bulletinExamenSchema);