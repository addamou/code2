const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const SoinsUrgence = require("../../models/SoinsUrgence");
const User = require("../../models/User");

//Ajouter un soins en urgence
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newSoinsUrgence = new SoinsUrgence({
    ...req.body,
    demande: req.body.demande,
    protocol: req.body.protocol,
    createdBy: user.id,
  });

  newSoinsUrgence
    .save()
    .then((response) => res.json({ soinsUrgence: response }))
    .catch((errors) => res.json({ errors }));
});

// rechercher un Fiche de Soin
router.post("/one", (req, res) => {
  SoinsUrgence.findOne(req.body.id)
    .populate("patient")
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

// Charger les soins en urgence d'un patient
router.get("/", (req, res) => {
  SoinsUrgence.find()
    .then((resp) => res.json(resp))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
