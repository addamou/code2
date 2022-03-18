const Validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports =  function validateAccueil(data) {
    let errors = {}

    data.demande= !isEmpty(data.demande) ? data.demande : []
    data.patient= !isEmpty(data.patient) ? data.patient : ''

    
    if(Validator.isEmpty(data.patient)){
        errors.patient= "Identifier le patient"
    }


    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}