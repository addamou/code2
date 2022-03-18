const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var rapportFinancierSchema = new mongoose.Schema({
    
    debut: {
        type: Date,
        default: Date.now
    },
    fin: {
        type: Date,
        default: Date.now
    },
    caissiere: {
        type: String,
    },
    montant: {
        type: Number,
    },
    manque: {
        type: String,
    },
    observation: {
        type: String
    },
    nom: {
        type: String,
      },
    prenom: {
        type: String,
      },
      createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    agent: {
        type: String
    }
});

//Export the model
module.exports = mongoose.model('rapportFinancier', rapportFinancierSchema);