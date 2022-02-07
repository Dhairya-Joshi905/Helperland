"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
const celebrate_1 = require("celebrate");
exports.LoginSchema = {
    login_check: {
        body: celebrate_1.Joi.object({
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('Email of User'),
            Password: celebrate_1.Joi.string()
                .required()
                .description('password'),
        })
    },
};
