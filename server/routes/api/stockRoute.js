const router = require('express').Router();
const Stockage = require("../../models/Stockage");

/** =====Trouver tous les objets de notre base de donnee =====**/
router.get('/', async (req, res) => {
    try {
        const stocks = await Stockage.find()
        res.status(200).json(stocks)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

/** Creation d'un objet dans la base de donnee **/
router.post('/', async (req, res) => {
    const stock = await Stockage.create(req.body)
    if (stock) {
        return res.status(201).json({ message: 'Produit crée', stock });
    }
    res.status(400).json({ message: error.message })

})

/** Trouver un Objet grace a son ID **/
router.get("/:id", async (req, res) => {
    try {
        const stock = await Stockage.findById(req.params.id)
        res.status(200).json(stock)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

/** Entrer et Sortie en stock route **/
router.put('/data/:_id', (req, res) => {
    Stockage.findOne({ _id: req.params._id })
        .then(stockage => {
            const {
                date, destination, entree, sortie, lot, datePeremption, perte, observation
            } = req.body
            const newEntree = {
                date, destination, entree, sortie, lot, datePeremption, perte, observation
            };
            // Ajouter les données au tableau
            stockage.donnees.push(newEntree);
            stockage.save().then(() => res.status(200).json({ success: true, message: `Entrer en stock effectué avec succés`, newEntree }));
        })
        .catch(err => res.status(400).json("Erreur: " + err))
});

/** Rechercher un produit dans le lot**/
router.post('/verify', (req, res) => {
    Stockage.findOne({ $and: [{ description: { $regex: req.body.description } }, { description: { $exists: true } }] })
        .then(stock => {
            if (stock) {
                return res.json({ success: true, stock })
            } else {
                return res.json({ errors: 'Produit non trouver' })
            }
        })
        .catch(errors => res.json({ errors }))
});

/** Route de suppression **/
router.delete('/:id', async (req, res, next) => {
    try {
        await Stockage.findOneAndDelete(req.params.id);
        return res.status(200).json({ success: true });
    } catch (err) {
        return next(err);
    }
});

module.exports = router

