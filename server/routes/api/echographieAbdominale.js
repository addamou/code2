const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const EchograhieAbdominale = require("../../models/EchographieAbdominale");
const User = require("../../models/User");

//Ajouter une decharge pour un patient
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newElement = new EchograhieAbdominale({
    createdBy: user.id,
    ...req.body,
  });

  newElement
    .save()
    .then((response) => res.json({ echo: response }))
    .catch((errors) => res.json({ errors }));
});

// charger les decharges d'un patient
router.get("/", (req, res) => {
  return EchograhieAbdominale.find()
    .then((resp) => res.json(resp))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
