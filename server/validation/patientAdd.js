const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports =  function validateAgentUpdate(data) {
    let errors = {}

    data.name= !isEmpty(data.name) ? data.name : ''
    data.lastName= !isEmpty(data.lastName) ? data.lastName : ''

    if(!Validator.isLength(data.name, { min: 3, max : 50})){
        errors.name = 'le nom ne peut pas contenir moins de 3 caractères et plus de 50 caractère'
    }
    if(!Validator.isLength(data.lastName, { min: 3, max : 50})){
        errors.lastName = 'le nom de famille ne peut pas contenir moins de 3 caractères et plus de 50 caractère'
    }
    
   

    if(Validator.isEmpty(data.name)){
        errors.name= 'le prénom ne peut pas être vide'
    }
    if(Validator.isEmpty(data.lastName)){
        errors.lastName= 'le nom de famille ne peut pas être vide'
    }

    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}