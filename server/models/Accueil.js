const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accueilSchema = new Schema({
  demande: {
    type: Array,
    required: true,
  },
  assurencePriseEnCharge: {
    type: String,
  },
  agentAccueil: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "agent",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
  },
  agentConsultant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "agent",
  },
  agentPerception: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "agent",
  },

  post: {
    type: String,
  },
  idSup: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Accueil = mongoose.model("accueil", accueilSchema);
