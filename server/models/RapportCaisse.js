const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var caisseSchema = new mongoose.Schema({

  monter: {
    type: Date,
    default: Date.now
  },

  descente: {
    type: Date,
    default: Date.now
  },

  montant: {
    type: Number
  },

  observation: {
    type: String
  },

  noms: {
    type: String
  },
  prenoms: {
    type: String
  },
  
  document: {
    type: String
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "agent"
  },
  caissiere: {
      type: String
  }

}, {
  timestamps: true
});

//Export the model
module.exports = mongoose.model('rapportCaisse', caisseSchema)