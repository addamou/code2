const express = require("express");
const router = express.Router();
const docAdmin = require("../../models/DocumentAdmin");
const auth = require("../../middleware/auth");
const multer = require("../../middleware/document");

//Creations Rapport
router.post("/", multer, (req, res) => {
  const newRapport = new docAdmin({
    titre: req.body.titre,
    nom: req.body.nom,
    prenom: req.body.prenom,
    agent: req.body.agent,
    document: req.file.originalname,
  });
  newRapport
    .save()
    .then(() => res.json("Documents Administratif enregistrer."))
    .catch((err) => res.status(400).json(`Erreur : ${err}`));
});

// Trouver un rapport
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await docAdmin.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Trouver tous les rapports
router.get("/", async (req, res) => {
  try {
    const rapports = await docAdmin.find();

    res.status(200).json(rapports);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
