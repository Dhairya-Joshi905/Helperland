"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySettingsSchema = void 0;
var celebrate_1 = require("celebrate");
var header = {
    authorization: celebrate_1.Joi.string()
        .required()
};
exports.MySettingsSchema = {
    UpdateUser: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('Dhairya')
                .description('FirstName of user'),
            LastName: celebrate_1.Joi.string()
                .required()
                .example('Joshi')
                .description('LastName of user'),
            Mobile: celebrate_1.Joi.string()
                .length(10)
                .required()
                .example('9876543210')
                .description('Phone Number of user'),
            DateOfBirth: celebrate_1.Joi.string()
                .required()
                .example('01-01-2000')
                .description('birth date of user'),
            NationalityId: celebrate_1.Joi.number()
                .integer()
                .required()
                .example(1)
                .description('language spoken by you'),
            Gender: celebrate_1.Joi.string()
                .required()
                .example('Male/Female')
                .description('Gender'),
            Address: celebrate_1.Joi.object()
                .required()
                .description('address')
        })
    },
    ChangePassword: {
        body: celebrate_1.Joi.object({
            OldPassword: celebrate_1.Joi.string()
                .required()
                .example('admin')
                .description('password'),
            NewPassword: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('abcd1234')
                .description('password'),
            ConfirmPassword: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('abcd1234')
                .description('password')
        })
    },
};
