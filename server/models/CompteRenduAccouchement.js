const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var compteRenduAccouchementSchema = new mongoose.Schema({
    
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
    cra: {
        type: String
    },
    agent: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
      }
});

//Export the model
module.exports = mongoose.model('compteRenduAccouchement', compteRenduAccouchementSchema)