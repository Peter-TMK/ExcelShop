const Joi = require("joi");

const userAddSchema = Joi.object({
  name: Joi.string().max(255).trim().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),,
  passwordHash: Joi.string().required(),
  street: Joi.string().max(255),
  apartment: Joi.string().max(255),
  city: Joi.string().max(255),
  zip: Joi.string().max(255),
  country: Joi.string().max(255),
  phone: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
  isAdmin: Joi.string().max(50),
  
  // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  // repeat_password: Joi.ref('password'),
  // email: Joi.string().required(),
  // dob: Joi.date().greater("1-1-1900").less("1-1-2022").required(),
  // country: Joi.string().optional(),
  // books: Joi.array().items(Joi.string()).optional(),
});

const UpdateUserSchema = Joi.object({
  firstname: Joi.string().min(3).max(255).trim(),
  lastname: Joi.string().min(3).max(255).trim(),
  username: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
});

async function addUserValidationMiddleware(req, res, next) {
  const userPayLoad = req.body;

  try {
    await userAddSchema.validateAsync(userPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function updateUserValidationMiddleware(req, res, next) {
  const userPayLoad = req.body;

  try {
    await UpdateUserSchema.validateAsync(userPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

module.exports = {
  addUserValidationMiddleware,
  updateUserValidationMiddleware,
};
