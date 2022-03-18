const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const CertificatAccouchement = require("../../models/CertificatAccouchement");

// ajouter un certificat d'accouchement
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newCertificatAccouchement = new CertificatAccouchement({
    profession: req.body.profession,
    mle: req.body.mle,
    dateAccouchement: req.body.dateAccouchement,
    sexe: req.body.sexe,
    prenom: req.body.prenom,
    pere: req.body.pere,
    patient: req.body.patient,
    agent: req.body.agent,
    createdBy: user.id,
  });

  newCertificatAccouchement
    .save()
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

// charger les certificats d'accouchement d'un patient

router.post("/", (req, res) => {
  CertificatAccouchement.find({ patient: req.body.patient })
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

router.get("/", (req, res) => {
  CertificatAccouchement.find()
    .then((resp) => res.json(resp))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
