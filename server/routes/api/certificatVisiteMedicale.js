const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const CertificatVisiteMedicale = require("../../models/CertificatVisiteMedicale");
const User = require("../../models/User");

// ajouter un certificat de visite Medical
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newCertificatVisiteMedicale = new CertificatVisiteMedicale({
    patient: req.body.patient,
    justification: req.body.justification,
    agent: req.body.agent,
    createdBy: user.id,
  });

  newCertificatVisiteMedicale
    .save()
    .then((response) => res.json({ certificatVisiteMedicale: response }))
    .catch((errors) => res.json({ errors }));
});

// charger les certificats de visite medical d'un patient

router.post("/", (req, res) => {
  CertificatVisiteMedicale.find({ patient: req.body.patient })
    .then((response) => res.json({ certificatVisiteMedicale: response }))
    .catch((errors) => res.json({ errors }));
});

router.get("/", (req, res) => {
  CertificatVisiteMedicale.find()
    .then((resp) => res.json(resp))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
