"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsSchema = void 0;
const celebrate_1 = require("celebrate");
const params = {
    id: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of ContactUs')
};
exports.ContactUsSchema = {
    get: {
        params: params
    },
    add: {
        body: celebrate_1.Joi.object({
            firstName: celebrate_1.Joi.string()
                .required()
                .example('Max')
                .description('firstName of ContactUs'),
            lastName: celebrate_1.Joi.string()
                .example('Jones')
                .description('lastName of ContactUs'),
            email: celebrate_1.Joi.string()
                .email()
                .example('abc@gmail.com')
                .description('email of ContactUs')
        })
    },
    update: {
        params: params,
        body: celebrate_1.Joi.object({
            firstName: celebrate_1.Joi.string()
                .example('Max')
                .description('firstName of ContactUs'),
            lastName: celebrate_1.Joi.string()
                .example('Jones')
                .description('lastName of ContactUs'),
            email: celebrate_1.Joi.string()
                .email()
                .example('abc@gmail.com')
                .description('email of ContactUs')
        })
    }
};
