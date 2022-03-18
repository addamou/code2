const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var imagerieSchema = new mongoose.Schema({
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

    echographie: {
        type: String
    },
    observations: {
        type: String
    },
    conclusion: {
        type: String
    },
    radiographie: {
        type: String
    },
    rapport: {
        type: String
    },
    agent: {
        type: String
    }
});

//Export the model
module.exports = mongoose.model('imagerie', imagerieSchema)