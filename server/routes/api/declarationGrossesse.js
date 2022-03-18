const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const DeclarationGrossesse = require("../../models/DeclarationGrossesse");
const User = require("../../models/User");

//Ajouter une compte Rendu d'accouchement pour un patient
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newElement = new DeclarationGrossesse({
    patient: req.body.id,
    nombreMois: req.body.nombreMois,
    mari: req.body.mari,
    numSecuriteSociale: req.body.numSecuriteSociale,
    profession: req.body.profession,
    nomEmployeur: req.body.nomEmployeur,
    femme: req.body.femme,
    delivree: req.body.delivree,
    demeure: req.body.demeure,
    createdBy: user.id,
    agent: req.body.agent,
  });

  newElement
    .save()
    .then((response) => res.json({ cra: response }))
    .catch((errors) => res.json({ errors }));
});

// charger les compte rendu d'accouchement d'un patient
router.get("/", auth, (req, res) => {
  DeclarationGrossesse.find({ patient: req.body.id })
    .then((response) => res.json({ cra: response }))
    .catch((errors) => res.json({ errors }));
});

module.exports = router;
