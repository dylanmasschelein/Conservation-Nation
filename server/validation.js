const Joi = require('joi');

// Register Validation
const registerValidation = (data) => {

    const schema = Joi.object({
    //   email: Joi.string().min(6).required().email(),
    //   username: Joi.string().min(6).required(),
    //   password: Joi.string().min(6).max(255).required(),
    //   firstName: Joi.string().required(),
    //   lastName: Joi.string().required(),
    //   address: Joi.string().required(),
    //   city: Joi.string().required(),
    //   country: Joi.string().required(),
    //   about: Joi.string(),
    })

    return schema.validate(data)
}

    const loginValidation = (data) => {

        const schema = Joi.object({
          email: Joi.string().min(6).required().email(),
          password: Joi.string().min(6).max(255).required(),
       
        })
    
        return schema.validate(data)
    }


module.exports.loginValidation = loginValidation
module.exports.registerValidation = registerValidation