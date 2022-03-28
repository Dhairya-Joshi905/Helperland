"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    UserId: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of User')
};
exports.HelperSchema = {
    get: {
        params: params
    },
    validate: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('Dhairya')
                .description('FirstName of helper'),
            LastName: celebrate_1.Joi.string()
                .required()
                .example('Joshi')
                .description('LastName of helper'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of helper'),
            Password: celebrate_1.Joi.string()
                .required()
                .description('password'),
            ConfirmPassword: celebrate_1.Joi.string()
                .required()
                .description('confirmPassword'),
            Mobile: celebrate_1.Joi.string()
                .length(10)
                .pattern(/^[0-9]+$/)
                .required()
                .example('1234567890')
                .description('Phone Number of helper'),
            ZipCode: celebrate_1.Joi.string()
                .required()
                .example('380015')
                .description('Zip code')
        })
    }
};
