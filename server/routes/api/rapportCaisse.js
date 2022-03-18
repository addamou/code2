const express = require("express");
const router = express.Router();
const rapportCaisse = require("../../models/RapportCaisse");
const multer = require("../../middleware/caisse");

//Creations Rapport
router.post("/", multer, (req, res) => {
  const newRapport = new rapportCaisse({
    monter: req.body.monter,
    montant: req.body.montant,
    noms: req.body.noms,
    prenoms: req.body.prenoms,
    observation: req.body.observation,
    caissiere: req.body.caissiere,
    document: req.file.originalname,
  });
  newRapport
    .save()
    .then(() => res.json("Rapport de caisse enregistrer."))
    .catch((err) => res.status(400).json(`Erreur : ${err}`));
});

// Trouver un rapport
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await rapportCaisse.findById(id);
    //`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Trouver tous les rapports
router.get("/", async (req, res) => {
  try {
    const rapports = await rapportCaisse.find();

    res.status(200).json(rapports);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
