const express = require("express");
const router = express.Router();
const Contact = require("../../models/Contact");

/** Route de recuperation des Contact **/

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json({ success: true, message: `Données contact reçu avec succés!`, Contact: contacts })
    } catch (err) {
        res.status(404).json("Error: " + err)
    }
});

/** Route de Creation Contact dans ma base de donnee **/

router.post('/ajout', async (req, res) => {
    const {
        email,
        name,
        mobile,
        motif,
        message
    } = req.body

    const newContact = new Contact({
        email,
        name,
        mobile,
        motif,
        message
    })

    try {

        const contact = await newContact.save();
        res.status(201).json({ success: true, message: `Message envoyé avec succés!`, Contact: contact });

    } catch (err) {
        res.status(500).json({ error: err.message || err.toString() });
    }
});

/** Route de supression Contact Moi */
router.delete('/:_id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true, message: `Message effacé avec succés!` })
    } catch (error) {
        res.status(400).json("Error: " + err)
    }
});

router.delete('/remove/:_id', async (req, res, next) => {
    try {
        let found = await Contact.findOneAndDelete(req.params._id);

        return res.status(200).json(found);
    } catch (err) {
        return next(err);
    }
});




module.exports = router