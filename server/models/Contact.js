const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    motif: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//Export the model
module.exports = mongoose.model('Contact', contactSchema);