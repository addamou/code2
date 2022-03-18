const router = require("express").Router();
const multer = require("../../middleware/fiche");
const Fiche = require("../../models/FicheNumeration");

router.post("/", multer, (req, res) => {
  const newRapport = new Fiche({
    fiche: req.file.originalname,
    patient: req.body.patient,
    bulletinId: req.body.bulletinId,
    agent: req.body.agent,
  });
  newRapport
    .save()
    .then(() => res.json("Fiche de résultat enregistrer"))
    .catch((err) => res.status(400).json({ msg: "Erreur serveur !" }));
});

router.get("/", (req, res) => {
  Fiche.find()
    .then((resp) => res.json(resp))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
