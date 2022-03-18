const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var patientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
    },
    adresse: {
        type: String
    },
    groupeSanguin: {
        type: String
    },

    coordonnee: [{
        long: String,
        lat: String
    }],

    date: {
        type: Date,
        default: Date.now
    },

    dateDeNaissance: {
        type: Date,
        default: Date.now
    },
    lieuDeNaissance: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "agent"
    }
});

//Export the model
module.exports = mongoose.model('patient', patientSchema)