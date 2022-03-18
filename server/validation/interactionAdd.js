const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateInteraction(data) {
    let errors = {}

    data.label = !isEmpty(data.label) ? data.label : ''
    data.price = !isEmpty(data.price) ? data.price : ''
    data.poste = !isEmpty(data.poste) ? data.poste : ''


    if (Validator.isEmpty(data.label)) {
        errors.label = 'le libellé ne peut pas être vide'
    }
    if (Validator.isEmpty(data.price)) {
        errors.price = 'le prix ne peut pas être vide'
    }
    if (Validator.isEmpty(data.poste)) {
        errors.poste = 'le poste ne peut pas être vide'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}