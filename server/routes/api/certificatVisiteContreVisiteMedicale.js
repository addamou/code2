const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const certificatVisiteContreVisite = require("../../models/CertificatVisiteContreVisite");
const User = require("../../models/User");

// ajouter un certificat de visite et contre visite Medical
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (req.body.id) {
    certificatVisiteContreVisite
      .findByIdAndUpdate(req.body.id, {
        justification2: req.body.justification2,
        createdBy2: user.id,
      })
      .then((response) => res.json({ certificatVisiteContreVisite: response }))
      .catch((errors) => res.json({ errors }));
  } else {
    const newCertificatVisiteContreVisite = new certificatVisiteContreVisite({
      patient: req.body.patient,
      justification1: req.body.justification1,
      createdBy: user.id,
    });

    newCertificatVisiteContreVisite
      .save()
      .then((response) => res.json({ certificatVisiteContreVisite: response }))
      .catch((errors) => res.json({ errors }));
  }
});

// charger les certificats de visite et contre visite  medical d'un patient

router.post("/", (req, res) => {
  certificatVisiteContreVisite
    .find({ patient: req.body.patient })
    .then((response) =>
      res.json({ certificatVisiteEtContreVisiteMedicale: response })
    )
    .catch((errors) => res.json({ errors }));
});

module.exports = router;
