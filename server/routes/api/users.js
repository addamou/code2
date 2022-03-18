const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  "/",
  check("name", "Nom requis !").notEmpty(),
  check("lastName", "Prénom requis !").notEmpty(),
  check(
    "phone",
    "Veuillez inclure un numéro de téléphone valide"
  ).isMobilePhone(),
  check("post", "Poste requis").notEmpty(),
  check(
    "password",
    "Veuillez saisir un mot de passe de 4 caractères ou plus"
  ).isLength({ min: 4 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, lastName, phone, post, isAdmin, active, password } = req.body;

    try {
      let user = await User.findOne({ phone });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "L'utilisateur existe déjà" }] });
      }

      user = new User({
        name,
        lastName,
        post,
        phone,
        isAdmin,
        active,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur du serveur");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ date: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
});

//Mettre a jour le profil Agent
router.put("/:id", async (req, res) => {
  const { name, lastName, phone, password, email } = req.body;

  const user = await User.findById(req.params.id);
  user.name = name;
  user.lastName = lastName;
  user.phone = phone;
  user.email = email;
  user.password = password;

  if (user) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user.save();
        res.json({ msg: "Félicitation pour le mise à jour de votre compte." });
      });
    });
  } else {
    res.status(404);
    throw new Error("Utilisateur non trouvé !");
  }
});

//Mettre a jour le profil du patient
router.put("/pass/:id", async (req, res) => {
  const { password } = req.body;

  const user = await User.findById(req.params.id);
  user.password = password;

  if (user) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user.save();
        res.json({
          msg: "Félicitation vous venez de réinitialisé le mot de passe de cet utilisateur.",
        });
      });
    });
  } else {
    res.status(404);
    throw new Error("Utilisateur non trouvé !");
  }
});

//Effacer un agents
router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "Utilisateur Effacer." });
  } else {
    res.status(404);
    throw new Error("Utilisateur non trouvé !");
  }
});

//Trouver une parmis tous
router.post("/one", (req, res) => {
  User.findById(req.body.id)
    .then((agent) => res.json(agent))
    .catch((errors) => res.json({ errors }));
});

module.exports = router;
