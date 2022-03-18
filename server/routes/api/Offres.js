const router = require("express").Router();
const Offre = require("../../models/Offres");

//Ajout d'Offre
router.post("/", async (req, res) => {
  try {
    const { label, poste } = req.body;
    const offre = await new Offre({ label, poste });
    const newOffre = await offre.save();
    res
      .status(201)
      .json({ success: true, message: `Offre créer avec succés`, newOffre });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//recuperer tous les offres
router.get("/", async (req, res) => {
  try {
    const offres = await Offre.find().sort({ date: -1 });
    res.json(offres);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

//effacer offres
router.delete("/:id", async (req, res, next) => {
  try {
    let foundStock = await Offre.findByIdAndDelete(req.params.id);
    return res.status(200).json(foundStock);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
