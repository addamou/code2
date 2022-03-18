const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const BulletinDeSortie = require("../../models/BulletinDeSortie");
const User = require("../../models/User");

//ajouter un billet de sortie
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  const newBulletinDeSortie = new BulletinDeSortie({
    visiteRetour: req.body.visiteRetour,
    ordonnanceSortie1: req.body.ordonnanceSortie1,
    ordonnanceSortie2: req.body.ordonnanceSortie2,
    ordonnanceSortie3: req.body.ordonnanceSortie3,
    dateSortie: req.body.dateSortie,
    diagnosticRetenu: req.body.diagnosticRetenu,
    dureeHospitalisation: req.body.dureeHospitalisation,
    finPeriode: req.body.finPeriode,
    debutPeriode: req.body.debutPeriode,
    patient: req.body.patient,
    agent: req.body.agent,
    motifHospitalisation: req.body.motifHospitalisation,
    createdBy: user.id,
  });

  newBulletinDeSortie
    .save()
    .then((response) => res.json({ billetSortie: response }))
    .catch((errors) => res.json({ errors }));
});

// Charger les bulletins de sortie d'un patient
router.get("/", (req, res) => {
  BulletinDeSortie.find()
    .then((resp) => res.json(resp))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
