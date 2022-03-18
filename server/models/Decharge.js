const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var dechargeSchema = new mongoose.Schema({
   
    responsable: {
        type: String
    },

    typeResponsable: {
        malade: {
            type: Boolean
        },
        parent: {
            type: Boolean
        },
        accompagnant: {
            type: Boolean
        }
    },
    agent: {
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
});

//Export the model
module.exports = mongoose.model('decharge', dechargeSchema)