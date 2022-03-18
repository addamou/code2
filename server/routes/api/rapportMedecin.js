const rapportRouter = require("express").Router();
const Rapport = require("../../models/RapportMedecin");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

rapportRouter.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  const newElement = new Rapport({
    namePatient: req.body.namePatient,
    motif: req.body.motif,
    phone: req.body.phone,
    conclusion: req.body.conclusion,
    agent: req.body.agent,
    createdBy: user.id,
  });

  newElement
    .save()
    .then((response) => res.json(response))
    .catch((errors) => res.json({ errors }));
});

rapportRouter.get("/", async (req, res) => {
  const data = await Rapport.find();
  return res.status(201).json(data);
});

rapportRouter.get("/:id", async (req, res) => {
  const data = await Rapport.find({ createdBy: req.params.id });
  if (data) {
    return res.status(200).json({ msg: "Données trouvés", data });
  }
  return res.status(500).json({ msg: "Erreur serveur !" });
});

rapportRouter.delete("/:id", async (req, res) => {
  try {
    await Stockage.findOneAndDelete(req.params.id);
    return res.status(200).json({ success: true });
  } catch (err) {
    return next(err);
  }
});

module.exports = rapportRouter;
