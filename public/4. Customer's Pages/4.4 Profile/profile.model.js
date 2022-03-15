"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileSchema = void 0;
var celebrate_1 = require("celebrate");
var header = {
    authorization: celebrate_1.Joi.string()
        .required()
};
exports.ProfileSchema = {
    UpdateUser: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('D')
                .description('FirstName'),
            LastName: celebrate_1.Joi.string()
                .required()
                .example('J')
                .description('LastName'),
            Mobile: celebrate_1.Joi.string()
                .length(10)
                .required()
                .example('9876543210')
                .description('Phone Number'),
            DateOfBirth: celebrate_1.Joi.string()
                .required()
                .example('01-01-2000')
                .description('birth date'),
            LanguageId: celebrate_1.Joi.number()
                .integer()
                .required()
                .example(1)
                .description('language Id')
        })
    },
    UpdateCreateUserAddress: {
        body: celebrate_1.Joi.object({
            StreetName: celebrate_1.Joi.string()
                .required()
                .example('D')
                .description('FirstName'),
            HouseNumber: celebrate_1.Joi.string()
                .required()
                .example('Yashvant')
                .description('LastName'),
            PostalCode: celebrate_1.Joi.string()
                .required()
                .example('380015')
                .description('Zip code'),
            City: celebrate_1.Joi.string()
                .required()
                .example('Abad')
                .description('City'),
            Mobile: celebrate_1.Joi.string()
                .required()
                .length(10)
                .example('9876543210')
                .description('Phone Number')
        })
    },
    ChangePassword: {
        body: celebrate_1.Joi.object({
            OldPassword: celebrate_1.Joi.string()
                .required()
                .example('abcd1234')
                .description('old password'),
            NewPassword: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('1234abcd')
                .description('new password'),
            ConfirmPassword: celebrate_1.Joi.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                .required()
                .example('1234abcd')
                .description('password')
        })
    }
};
