const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Infirmiere = require("../../models/FicheTemperature");
const User = require("../../models/User");

router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newElement = new Infirmiere({
    createdBy: user.id,
    ...req.body,
  });

  newElement
    .save()
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

//Tous les docs fiche de temperature
router.get("/", (req, res) => {
  Infirmiere.find()
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

module.exports = router;
