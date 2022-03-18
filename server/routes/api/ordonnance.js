const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const Ordonnance = require("../../models/Ordonnance");

//Ajouter une ordonnance pour un patient
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newOrdonnance = Ordonnance({
    medicaments: req.body.medicaments,
    patient: req.body.patient,
    agent: req.body.agent,
    createdBy: user.id,
  });

  newOrdonnance
    .save()
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

//Trouver tous les Bulletins
router.get("/", (req, res) => {
  Ordonnance.find()
    .then((resp) => res.json(resp))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
