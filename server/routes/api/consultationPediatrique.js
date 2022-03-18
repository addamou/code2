const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Pediatrique = require("../../models/ConsultationPediatrique");
const User = require("../../models/User");

//Ajouter une compte Rendu d'accouchement pour un patient
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newElement = new Pediatrique({
    createdBy: user.id,
    ...req.body,
  });

  newElement
    .save()
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

// charger les consultations pediatriques d'un patient
router.get("/", (req, res) => {
  Pediatrique.find()
    .then((resp) => res.json(resp))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
