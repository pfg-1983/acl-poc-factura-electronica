const {ValidationError} = require('joi')

class CustomValidatorError extends ValidationError {
    constructor(error, file, _function) {
        super(error)
        this.statusCode = 400
        this.name = 'ValidatorError'
        this.stack = error.details
        this.code = 'ERR_VALIDATOR'
        this.message = error.message
        this.file = file
        this._function = _function
    }
}

module.exports = {CustomValidatorError}