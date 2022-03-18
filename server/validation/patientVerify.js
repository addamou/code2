const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports =  function validatePatient(data) {
    let errors = {}

    data.name= !isEmpty(data.name) ? data.name : ''
    data.lastName= !isEmpty(data.lastName) ? data.lastName : ''

    if(Validator.isEmpty(data.name)){
        errors.name= 'le nom ne peut pas être vide'
    }   
    if(Validator.isEmpty(data.lastName)){
        errors.lastName= 'le nom de famille ne peut pas être vide'
    }   
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}