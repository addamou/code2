const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Module = require("../../models/module");
const User = require("../../models/User");

router.post("/update", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (req.body.module) {
    let data = {};

    if (req.body.avisHospitalisation) {
      data.avisHospitalisation = req.body.avisHospitalisation;
    }
    if (req.body.billetDeSortie) {
      data.billetDeSortie = req.body.billetDeSortie;
    }
    if (req.body.bulletinExamen) {
      data.bulletinExamen = req.body.bulletinExamen;
    }
    if (req.body.certificatAccouchement) {
      data.certificatAccouchement = req.body.certificatAccouchement;
    }
    if (req.body.certificatGrossesse) {
      data.certificatGrossesse = req.body.certificatGrossesse;
    }
    if (req.body.certificatMedical) {
      data.certificatMedical = req.body.certificatMedical;
    }
    if (req.body.certificatVisiteMedicale) {
      data.certificatVisiteMedicale = req.body.certificatVisiteMedicale;
    }
    if (req.body.certificatVisiteContreVisite) {
      data.certificatVisiteContreVisite = req.body.certificatVisiteContreVisite;
    }
    if (req.body.compteRenduAccouchement) {
      data.compteRenduAccouchement = req.body.compteRenduAccouchement;
    }
    if (req.body.compteRenduHospitalisation) {
      data.compteRenduHospitalisation = req.body.compteRenduHospitalisation;
    }
    if (req.body.decharge) {
      data.decharge = req.body.decharge;
    }
    if (req.body.declarationGrossesse) {
      data.declarationGrossesse = req.body.declarationGrossesse;
    }
    if (req.body.dossier) {
      data.dossier = req.body.dossier;
    }
    if (req.body.echographieAbdominale) {
      data.echographieAbdominale = req.body.echographieAbdominale;
    }
    if (req.body.echoVesicoProstatique) {
      data.echoVesicoProstatique = req.body.echoVesicoProstatique;
    }
    if (req.body.infirmiere) {
      data.infirmiere = req.body.infirmiere;
    }
    if (req.body.soinsUrgence) {
      data.soinsUrgence = req.body.soinsUrgence;
    }

    Module.updateOne(
      { _id: req.body.module },
      {
        $set: {
          ...data,
          createdBy: user.id,
        },
      }
    )
      .then((updating) => {
        console.log(updating);
        if (req.body.ordonnance) {
          console.log(req.body.ordonnance);
          Module.findOne({ _id: req.body.module })
            .then((ordonnance) => {
              return res.json({ ordonnance });
            })
            .catch((errors) => res.json({ errors }));
        } else {
          return res.json({ updating });
        }
      })
      .catch((errors) => res.json({ errors }));
  }
});

module.exports = router;
