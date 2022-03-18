const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Patient = require("../../models/patient");
const auth = require("../../middleware/auth");
const validateLoginInput = require("../../validation/Login");
const validatePatientVerify = require("../../validation/patientVerify");
const validatePatientVerifier = require("../../validation/patientVerifier");
const validatePatientAdd = require("../../validation/patientAdd");
const bcrypt = require("bcrypt");
// Trouver un patient atravers son nom et prenom
router.post("/verify", auth, (req, res) => {
  const { errors, isValid } = validatePatientVerify(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Patient.find({
    $and: [
      { name: { $regex: req.body.name } },
      { lastName: { $regex: req.body.lastName } },
    ],
  })
    .then((patient) => {
      if (patient) {
        return res.json({ patient });
      } else {
        return res.json({ errors: "Patient non trouver" });
      }
    })
    .catch((errors) =>
      res.json({
        errors,
        msg: "Ce patient n'existe pas dans nos archives, veuillez le créé !",
      })
    );
});

//trouver un patient par son numero
router.post("/check", (req, res) => {
  Patient.findOne({ $regex: req.body.phone })
    .then((patient) => {
      if (patient) {
        return res.status(200).json({ patient });
      } else {
        return res.json({
          msg: "Ce patient n'existe pas dans le système, veuillez le créé !",
        });
      }
    })
    .catch((errors) => res.json({ errors }));
});

router.post("/verifier", (req, res) => {
  const { errors, isValid } = validatePatientVerifier(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Patient.findOne({
    $and: [
      { name: { $regex: req.body.name } },
      { phone: { $regex: req.body.phone } },
    ],
  })
    .then((patient) => {
      if (patient) {
        return res
          .status(200)
          .json({ patient, msg: `${patient.name} est trouvé` });
      } else {
        return res.status(400).json({ errors: "Patient non trouver" });
      }
    })
    .catch((errors) =>
      res.json({
        errors,
        msg: "Ce patient n'existe pas dans nos archives, veuillez le créé !",
      })
    );
});

//Ajouter un patient
router.post("/add", auth, (req, res) => {
  const { errors, isValid } = validatePatientAdd(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const newPatient = new Patient({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    adresse: req.body.adresse,
    password: req.body.password,
    groupeSanguin: req.body.groupeSanguin,
    coordonnee: req.body.coordonnee,
    dateDeNaissance: req.body.dateDeNaissance,
    lieuDeNaissance: req.body.lieuDeNaissance,
    createdBy: decodedToken.id,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newPatient.password, salt, (err, hash) => {
      newPatient.password = hash;

      newPatient
        .save()
        .then((agent) => res.status(201).json(agent))
        .catch((errors) => res.send(errors));
    });
  });
});

//Update patient
router.post("/update", auth, (req, res) => {
  if (!req.body.id) {
    return res.json({ errors: "Veuillez choisir le patient à modifier" });
  }
  const { errors, isValid } = validatePatientAdd(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let patient = {};

  if (req.body.name) {
    patient.name = req.body.name;
  }
  if (req.body.lastName) {
    patient.lastName = req.body.lastName;
  }
  if (req.body.dateDeNaissance) {
    patient.dateDeNaissance = req.body.dateDeNaissance;
  }
  if (req.body.lieuDeNaissance) {
    patient.lieuDeNaissance = req.body.lieuDeNaissance;
  }
  if (req.body.email) {
    patient.email = req.body.email;
  }
  if (req.body.adresse) {
    patient.adresse = req.body.adresse;
  }
  if (req.body.phone) {
    patient.phone = req.body.phone;
  }
  if (req.body.password) {
    patient.password = req.body.password;
  }
  if (req.body.groupeSanguin) {
    patient.groupeSanguin = req.body.groupeSanguin;
  }
  if (req.body.coordonnee) {
    patient.coordonnee = req.body.coordonnee;
  }

  Patient.updateOne(
    { _id: req.body.id },
    {
      $set: patient,
    }
  )
    .then((agent) => res.json({ agent }))
    .catch((errors) => res.json({ errors }));
});

//Tous la liste des patients
router.get("/", auth, (req, res) => {
  Patient.find()
    .then((patient) => res.json(patient))
    .catch((err) => res.status(400).json("Erreur: " + err));
});

//effacer un patient du systeme
router.delete("/:id", (req, res) => {
  Patient.findByIdAndDelete(req.params.id);
  res.status(200).json({ msg: "Effacer !" });
});

router.put("/:id", async (req, res) => {
  const {
    name,
    lastName,
    phone,
    password,
    email,
    adresse,
    groupeSanguin,
    coordonnee,
  } = req.body;

  const patient = await Patient.findById(req.params.id);
  patient.name = name;
  patient.lastName = lastName;
  patient.phone = phone;
  patient.email = email;
  patient.password = password;
  patient.adresse = adresse;
  patient.groupeSanguin = groupeSanguin;
  patient.coordonnee = coordonnee;

  if (patient) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(patient.password, salt, (err, hash) => {
        if (err) throw err;
        patient.password = hash;
        patient.save();
        res.json({ msg: "Félicitation pour le mise à jour de votre compte." });
      });
    });
  } else {
    res.status(404);
    throw new Error("Utilisateur non trouvé !");
  }
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const name = req.body.name;
  const password = req.body.password;

  // Find user by email
  User.findOne({ name }).then((patient) => {
    // Check if user exists
    if (!patient) {
      return res.status(404).json({ phonenotfound: "Numéro non trouvé !" });
    }

    // Check password
    bcrypt.compare(password, patient.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: patient.id,
          name: patient.name,
          lastName: patient.lastName,
          email: patient.email,
          phone: patient.phone,
          adresse: patient.adresse,
          password: patient.password,
          groupeSanguin: patient.groupeSanguin,
          coordonnee: patient.coordonnee,
          dateDeNaissance: patient.dateDeNaissance,
          lieuDeNaissance: patient.lieuDeNaissance,
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              payload,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Mot de passe incorrecte !" });
      }
    });
  });
});

module.exports = router;
