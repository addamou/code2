const express = require("express");
const router = express.Router();
const Accueil = require("../../models/Accueil");
const MurAccueil = require("../../models/TableauAccueil");
const MurGeant = require("../../models/TableauMedecins");
const Module = require("../../models/module");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// Ajouter une consultation sur le mur accueil destinée aux agents de la perception
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  const newAcceuil = new Accueil({
    demande: req.body.demande,
    assurencePriseEnCharge: req.body.assurencePriseEnCharge,
    patient: req.body.patient,
    idSup: req.body.idSup,
    post: req.body.post,
    agentAccueil: user.id,
  });

  newAcceuil
    .save()
    .then((accueil) => {
      res.status(201).json(accueil);
    })
    .catch((errors) => res.json({ errors }));
});

router.post("/medecin", (req, res) => {
  const newAcceuil = new Accueil({
    demande: req.body.demande,
    patient: req.body.patient,
    post: req.body.post,
  });

  newAcceuil
    .save()
    .then((accueil) => {
      const addMurGeant = new MurGeant({
        geant: accueil._id,
      });

      addMurGeant
        .save()
        .then((mur) => res.status(201).json({ accueil }))
        .catch((errors) => res.json({ errors }));
    })
    .catch((errors) => res.json({ errors }));
});

router.post("/add", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  const newAcceuil = new Accueil({
    demande: req.body.demande,
    assurencePriseEnCharge: req.body.assurencePriseEnCharge,
    patient: req.body.patient,
    idSup: req.body.idSup,
    agentAccueil: user.id,
  });

  newAcceuil
    .save()
    .then((accueil) => {
      const addMurAccueil = new MurAccueil({
        accueil: accueil._id,
      });

      addMurAccueil
        .save()
        .then((mur) => res.status(201).json({ accueil }))
        .catch((errors) => res.json({ errors }));
    })
    .catch((errors) => res.json({ errors }));
});

// Ajouter une consultation sur le mur accueil destinée aux agents de la perception
router.post("/infirmiere", auth, (req, res) => {
  Accueil.updateOne(
    { _id: req.body.id },
    {
      $set: {
        post: req.body.post,
      },
    }
  )
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.put("/:id", async (req, res) => {
  const updatedAccueil = await Accueil.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  );
  res.send(updatedAccueil);
});

//valider le payement d'une consultation pour un patient et d'ajouter sur le mur medecin concerné
router.post("/perception", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  Accueil.findOne({ _id: req.body.id })
    .then((accueil) => {
      if (accueil) {
        if (req.body.module) {
          Accueil.updateOne(
            { _id: req.body.id },
            {
              $set: {
                demande: req.body.demande,
                assurencePriseEnCharge: req.body.assurencePriseEnCharge,
                post: req.body.post,
                module: req.body.module,
                agentPerception: user.id,
              },
            }
          )
            .then((perception) => {
              // if(req.body.post== 'medecinGeneraliste'){
              const newMurGeant = new MurGeant({
                geant: accueil._id,
              });

              newMurGeant
                .save()
                .then((geant) => {
                  MurAccueil.findOneAndDelete({ accueil: accueil._id }).then(
                    (supprime) => res.json({ geant, supprime })
                  );
                })
                .catch((errors) => res.json({ errors }));
              // }
            })
            .catch((errors) => res.json({ errors }));
        } else {
          const newModule = new Module({
            patient: accueil.patient,
            perception: req.body.id,
          });

          newModule
            .save()
            .then((module) => {
              Accueil.updateOne(
                { _id: req.body.id },
                {
                  $set: {
                    demande: req.body.demande,
                    montant: req.body.montant,
                    assurencePriseEnCharge: req.body.assurencePriseEnCharge,
                    post: req.body.post,
                    police: req.body.police,
                    module: module._id,
                    agentPerception: user.id,
                  },
                }
              ).then((perception) => {
                // if(req.body.post== 'medecinGeneraliste'){
                const newMurGeant = new MurGeant({
                  geant: accueil._id,
                });

                newMurGeant
                  .save()
                  .then((geant) => {
                    MurAccueil.findOneAndDelete({ accueil: accueil._id }).then(
                      (supprime) => res.json({ geant, supprime })
                    );
                  })
                  .catch((errors) => res.json({ errors }));
                // }
              });
            })
            .catch((errors) => res.json({ errors }));
        }
      } else {
        res.json({ errors: "rien trouver" });
      }
    })
    .catch((errors) => res.json({ errors }));
});

//effacer de l'accueil
router.delete("/:id", (req, res) => {
  Accueil.findOneAndDelete(req.params.id)
    .then((accueil) => res.json({ accueil }))
    .catch((errors) => res.json({ errors }));
});

router.delete("/maintenance", (req, res) => {
  Accueil.delete([]).then((accueil) => res.json(accueil));
});

module.exports = router;
