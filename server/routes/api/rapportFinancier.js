const express = require("express");
//const auth = require("../../middleware/auth");
const RapportFinancier = require("../../models/RapportFinancier");
const router = express.Router();

//poste Rapport financier
router.post("/", (req, res) => {
  const newRapport = new RapportFinancier({
    debut: req.body.debut,
    caissiere: req.body.caissiere,
    montant: req.body.montant,
    manque: req.body.manque,
    observation: req.body.observation,
    agent: req.body.agent,
  });
  newRapport
    .save()
    .then(() => res.json("Rapport de Validation enregistrer."))
    .catch((err) => res.status(400).json(`Erreur : ${err}`));
});

//Trouver tous les rapports
router.get("/", (req, res) => {
  RapportFinancier.find()
    .then((rapportsFinancier) => res.json(rapportsFinancier))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
