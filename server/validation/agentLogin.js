const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateAgent(data) {
    let errors = {}

    data.phone = !isEmpty(data.phone) ? data.phone : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    if (!Validator.isLength(data.phone, { min: 8, max: 13 })) {
        errors.phone = 'le numéro de téléphone ne peut être que 8 caractères'
    }
    if (!Validator.isLength(data.password, { min: 4, max: 20 })) {
        errors.password = 'le mot de passe ne peut pas contenir moins de 4 caractères'
    }

    if (Validator.isEmpty(data.phone)) {
        errors.phone = 'le numéro de téléphone ne peut pas être vide'
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'le mot de passe ne peut pas être vide'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}