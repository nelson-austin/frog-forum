
// create a validation rule
const Validator = require('validatorjs');
const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));

  const { body, validationResult } = require('express-validator')
 
const usersValidationRules = () => {
    return [
    body('firstName', 'First name is requied').not().isEmpty(),
    body('lastName', 'Last name is requied').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    body('', '').not().isEmpty(),
    body('birthday', 'Birthday is requied').not().isEmpty()
    ]
}
 
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
 
    return res.status(422).json({
      errors: extractedErrors,
    })
  }
 
module.exports = {
    usersValidationRules,
    validate,
  }
}




