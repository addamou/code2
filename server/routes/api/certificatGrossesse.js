const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const CertificatGrossesse = require("../../models/CertificatGrossesse");
const User = require("../../models/User");

//Ajouter un certificat d'accouchement pour un patient
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newElement = new CertificatGrossesse({
    createdBy: user.id,
    ...req.body,
  });

  newElement
    .save()
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

// charger les certificat d'accouchement d'un patient
router.get("/", (req, res) => {
  CertificatGrossesse.find()
    .then((resp) => res.json(resp))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
