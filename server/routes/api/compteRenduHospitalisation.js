const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const CompteRenduHospitalisation = require("../../models/CompteRenduHospitalisation");
const User = require("../../models/User");

//Ajouter une compte Rendu d'accouchement pour un patient
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newElement = new CompteRenduHospitalisation({
    createdBy: user.id,
    ...req.body,
    patient: req.body.patient,
  });

  newElement
    .save()
    .then((response) => res.json({ cra: response }))
    .catch((errors) => res.json({ errors }));
});

// charger les compte rendu d'Hospitalisation d'un patient
router.get("/", (req, res) => {
  CompteRenduHospitalisation.find()
    .then((resp) => res.json(resp))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
