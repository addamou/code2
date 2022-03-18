const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const EchoVesicoProstatique = require("../../models/EchoVesicoProstatique");
const User = require("../../models/User");

//Ajouter un echo Prostatique pour un patient
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newElement = new EchoVesicoProstatique({
    createdBy: user.id,
    ...req.body,
  });

  newElement
    .save()
    .then((response) => res.json({ cra: response }))
    .catch((errors) => res.json({ errors }));
});

//Tous les Docs Echo Prostates
router.get("/", (req, res) => {
  EchoVesicoProstatique.find()
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

module.exports = router;
