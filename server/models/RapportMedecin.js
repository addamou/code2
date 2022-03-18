const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var rapportMedecinSchema = new mongoose.Schema({
  namePatient: {
    type: String,
  },
  phone: {
    type: String,
  },
  motif: {
    type: String,
  },
  conclusion: {
    type: String,
  },
  agent: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "agent",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Export the model
module.exports = mongoose.model("RapportMedecin", rapportMedecinSchema);
