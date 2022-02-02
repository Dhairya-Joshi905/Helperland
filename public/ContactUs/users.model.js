"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const celebrate_1 = require("celebrate");
const params = {
    id: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of User')
};
exports.UserSchema = {
    get: {
        params: params
    },
    add: {
        body: celebrate_1.Joi.object({
            firstName: celebrate_1.Joi.string()
                .required()
                .example('Max')
                .description('firstName of user'),
            lastName: celebrate_1.Joi.string()
                .example('Jones')
                .description('lastName of user'),
            email: celebrate_1.Joi.string()
                .email()
                .example('abc@gmail.com')
                .description('email of user')
        })
    },
    update: {
        params: params,
        body: celebrate_1.Joi.object({
            firstName: celebrate_1.Joi.string()
                .example('Max')
                .description('firstName of user'),
            lastName: celebrate_1.Joi.string()
                .example('Jones')
                .description('lastName of user'),
            email: celebrate_1.Joi.string()
                .email()
                .example('abc@gmail.com')
                .description('email of user')
        })
    }
};
