const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var SoinsUrgenceSchema = new mongoose.Schema({
    demande: {
        type: Array
    },

    protocol: {
        type: String,
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
module.exports = mongoose.model('soinsUrgence', SoinsUrgenceSchema)