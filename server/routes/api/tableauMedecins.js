const express = require("express");
const router = express.Router();
const murGeant = require("../../models/TableauMedecins");
const auth = require("../../middleware/auth");

// get pour les agents medecins
router.get("/", (req, res) => {
  murGeant
    .find()
    .populate({
      path: "geant",
      populate: {
        path: "patient",
        select: "name lastName phone dateDeNaissance lieuDeNaissance adresse",
      },
    })
    .then((accueil) => res.json({ accueil }))
    .catch((errors) => res.json({ errors }));
});

router.delete("/:id", (req, res) => {
  murGeant
    .findOneAndDelete(req.params.geant)
    .then((geant) => res.json({ geant }))
    .catch((errors) => res.json({ errors }));
});

router.delete("/maintenance", (req, res) => {
  murGeant.deleteMany([]).then((res) => res.json(res));
});

module.exports = router;
