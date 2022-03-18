const express = require("express");
const router = express.Router();
const Imagerie = require("../../models/ConsultationImagerie");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

//Ajouter une compte Rendu d'accouchement pour un patient
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newElement = new Imagerie({
    createdBy: user.id,
    ...req.body,
  });

  newElement
    .save()
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

// charger les compte rendu d'accouchement d'un patient
router.get("/", (req, res) => {
  Imagerie.find()
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

module.exports = router;
