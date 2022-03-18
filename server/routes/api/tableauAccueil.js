const express = require("express");
const router = express.Router();
const MurAccueil = require("../../models/TableauAccueil");
const auth = require("../../middleware/auth");

// Lister les patients au niveau de la perception
router.get("/", (req, res) => {
  MurAccueil.find()
    .populate({
      path: "accueil",
      populate: {
        path: "patient agentConsultant",
        select: "name lastName  post",
      },
      select: "",
    })
    .then((accueil) => res.json({ accueil }))
    .catch((errors) => res.json({ errors }));
});

//Effacer un patient au niveau de la liste des patient
router.delete("/:id", auth, (req, res) => {
  MurAccueil.findOneAndDelete(req.params.accueil)
    .then((murAc) => res.json({ murAc }))
    .catch((err) => res.json({ err }));
});

router.delete("/maintenance", (req, res) => {
  MurAccueil.deleteMany([]).then((res) => res.json(res));
});

module.exports = router;
