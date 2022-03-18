const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/",
  check("phone", "Svp entrer un numero de téléphone valide").isMobilePhone(),
  check("password", "Mot de passe requis").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone, password } = req.body;

    try {
      let user = await User.findOne({ phone });

      if (!user) {
        return res.status(400).json({
          errors: [{ msg: "Les informations d'identification invalides" }],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: "Les informations d'identification invalides" }],
        });
      }

      const payload = {
        user: {
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          post: user.post,
          isAdmin: user.isAdmin,
          active: user.active,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) throw err;
          res.json({ user, token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erreur du serveur!");
    }
  }
);

module.exports = router;
