const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validatePerception(data) {
    let errors = {}

    data.id = !isEmpty(data.id) ? data.id : ''

    if (Validator.isEmpty(data.id)) {
        errors.id = "Veillez choisir la demande du patient "
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}