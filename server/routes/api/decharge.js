const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Decharge = require("../../models/Decharge");
const User = require("../../models/User");

//Ajouter une decharge pour un patient
router.post("/add", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newElement = new Decharge({
    createdBy: user.id,
    ...req.body,
  });

  newElement
    .save()
    .then((response) => res.json({ decharge: response }))
    .catch((errors) => res.json({ errors }));
});

// charger les decharges d'un patient
router.get("/", (req, res) => {
  Decharge.find()
    .then((resp) => res.json(resp))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
