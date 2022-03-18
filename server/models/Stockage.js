const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var stockageSchema = new mongoose.Schema({
  description: {
    type: String,
    require: true,
    unique: true,
    lowercase:true
  },
  unite: {
    type: String
  },
  stockMax: {
    type: String
  },
  stockMin: {
    type: String
  },
  agent: {
    type: String,
    required: true
  },

  donnees: [
    {
      destination: {
        type: String
      },
      entree: {
        type: Number,
        default: 0
      },
      sortie: {
        type: Number,
        default: 0
      },
      lot: {
        type: String
      },
      datePeremption: {
        type: Date,
        default: Date.now
      },
      perte: {
        type: String
      },
      observation: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now,
  }
});

//Export the model
module.exports = mongoose.model('stockage', stockageSchema);