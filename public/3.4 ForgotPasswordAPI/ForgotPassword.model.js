"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordSchema = void 0;
const celebrate_1 = require("celebrate");
exports.ForgotPasswordSchema = {
    reset: {
        body: celebrate_1.Joi.object({
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of user')
        })
    },
    newpassword: {
        body: celebrate_1.Joi.object({
            resetLink: celebrate_1.Joi.string()
                .required()
                .description('reset link'),
            newPassword: celebrate_1.Joi.string()
                .required()
                .description('new password of user')
        })
    }
};
