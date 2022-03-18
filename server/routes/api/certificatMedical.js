const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const CertificatMedical = require("../../models/CertificatMedical");
const User = require("../../models/User");

// ajouter un certificat Medical
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newCertificatMedical = new CertificatMedical({
    constat: req.body.constat,
    agent: req.body.agent,
    patient: req.body.patient,
    createdBy: user.id,
  });

  newCertificatMedical
    .save()
    .then((response) => res.json({ certificatMedical: response }))
    .catch((errors) => res.json({ errors }));
});

// charger les certificats medical d'un patient

router.post("/", (req, res) => {
  CertificatMedical.find({ patient: req.body.patient })
    .then((response) => res.json({ certificatMedical: response }))
    .catch((errors) => res.json({ errors }));
});

router.get("/", (req, res) => {
  CertificatMedical.find()
    .then((resp) => res.json(resp))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
