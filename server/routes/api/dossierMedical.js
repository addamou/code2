const express = require("express");
const router = express.Router();
const Dossier = require("../../models/DossierMedicale");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

//ajouter un dossier
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newDossier = new Dossier({
    sexe: req.body.sexe,
    adresse: req.body.adresse,
    assure: req.body.assure,
    numPolice: req.body.numPolice,
    numAssure: req.body.numAssure,
    medecin: req.body.medecin,
    entree: req.body.entree,
    sortie: req.body.sortie,
    chambre: req.body.chambre,
    motifConsultation: req.body.motifConsultation,
    histoireMaladie: req.body.histoireMaladie,
    medicale: req.body.medicale,
    chirurgical: req.body.chirurgical,
    gynecoObstetrique: req.body.gynecoObstetrique,
    familiers: req.body.familiers,
    examenEntree: req.body.examenEntree,
    t: req.body.t,
    ta: req.body.ta,
    poids: req.body.poids,
    etatGeneral: req.body.etatGeneral,
    coeur: req.body.coeur,
    poumons: req.body.poumons,
    abd: req.body.abd,
    orl: req.body.orl,
    autresApp: req.body.autresApp,
    resume: req.body.resume,
    examenDemandes: req.body.examenDemandes,
    diagnosticRetenu: req.body.diagnosticRetenu,
    conduiteTenir: req.body.conduiteTenir,
    examensUlterieurs: req.body.examensUlterieurs,
    observations: req.body.observations,
    patient: req.body.patient,
    createdBy: user.id,
  });

  newDossier
    .save()
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

// Charger les dossier d'un patient
router.post("/", (req, res) => {
  Dossier.find({ patient: req.body.id })
    .populate("patient")
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

//Modifier les Dossier
router.patch("/", (req, res) => {
  Dossier.findByIdAndUpdate(req.body.id, {
    $set: {
      ...req.body,
    },
  })
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

router.get("/", (req, res) => {
  Dossier.find()
    .then((resp) => res.json(resp))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
