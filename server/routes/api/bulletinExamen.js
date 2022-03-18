const express = require("express");
const router = express.Router();
const bulletinExamen = require("../../models/BulletinExamen");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

//ajouter un billet de sortie
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newBulletinExamen = new bulletinExamen({
    data: req.body.data,
    patient: req.body.patient,
    medecin: req.body.medecin,
    laborantin: req.body.laborantin,
    createdBy: user.id,
  });

  newBulletinExamen
    .save()
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

//mise à jour
router.post("/update", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  bulletinExamen
    .updateOne(
      { _id: req.body.id },
      {
        $set: {
          data: req.body.data,
          laborantin: req.body.laborantin,
          createdBy2: user.id,
        },
      }
    )
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//infirmiere
router.post("/infirmiere", (req, res) => {
  bulletinExamen
    .findOneAndUpdate({
      _id: req.body.id,
      $set: {
        data: req.body.data,
      },
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// Charger les billetin d'examen d'un patient
router.post("/", (req, res) => {
  bulletinExamen
    .find({ patient: req.body.id })
    .populate("patient")
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

// rechercher un billetin d'examen
router.post("/one", (req, res) => {
  bulletinExamen
    .findById(req.body.id)
    .populate("patient")
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

//Trouver tous les Bulletins
router.get("/", (req, res) => {
  bulletinExamen
    .find()
    .then((resp) => res.json(resp))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

module.exports = router;
