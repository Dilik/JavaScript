const Joi = require('joi');

module.exports.productSchema = Joi.object({
    product: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required().min(0),
        description: Joi.string().required().max(300),
        phoneNumber: Joi.string().required().max(20),
        condition: Joi.string().required().lowercase(),
        category: Joi.string().required().lowercase(),
        tags: Joi.string().allow('', null)
    }).required(),
    deleteImages: Joi.array()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})