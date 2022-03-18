const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var murAccueilSchema = new mongoose.Schema({
    accueil : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "accueil"
    }
});

//Export the model
module.exports = mongoose.model('tableauAccueil', murAccueilSchema )