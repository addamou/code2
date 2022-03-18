const express = require("express");
const router = express.Router();
const CompteRenduAccouchement = require("../../models/CompteRenduAccouchement");

//Ajouter une compte Rendu d'accouchement pour un patient
router.post("/", (req, res) => {
  const newData = new CompteRenduAccouchement({
    ...req.body,
  });

  newData
    .save()
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

// charger les compte rendu d'accouchement d'un patient
router.get("/:id", (req, res) => {
  const cra = CompteRenduAccouchement(req.params.id);
  if (!cra) return res.status(404).json({});

  return res.json(user);
});

router.get("/", (req, res) => {
  CompteRenduAccouchement.find()
    .then((resp) => res.json(resp))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
