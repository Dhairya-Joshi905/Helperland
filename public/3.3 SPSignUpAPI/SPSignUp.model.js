"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPSignUpSchema = void 0;
const celebrate_1 = require("celebrate");
const params = {
    id: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of CustomerSignUp')
};
exports.SPSignUpSchema = {
    spsignup_get: {
        params: params
    },
    spsignup_add: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .example('Max')
                .description('FirstName of CustomerSignUp'),
            LastName: celebrate_1.Joi.string()
                .example('Jones')
                .description('LastName of CustomerSignUp'),
            Email: celebrate_1.Joi.string()
                .email()
                .example('abc@gmail.com')
                .description('Email of CustomerSignUp'),
            Password: celebrate_1.Joi.string()
                .example('hbwgiwrbg')
                .description('Password of CustomerSignUp'),
            Mobile: celebrate_1.Joi.number()
                .integer()
                .example(987654321)
                .description('Mobile of CustomerSignUp'),
            RoleId: celebrate_1.Joi.number()
                .integer()
                .example(123)
                .description('RoleId of CustomerSignUp'),
            Gender: celebrate_1.Joi.number()
                .integer()
                .example('1')
                .description('Gender of CustomerSignUp'),
            DateOfBirth: celebrate_1.Joi.date()
                .example('2022-02-02 18:00:52.044+05:30')
                .description('Date of CustomerSignUp'),
            Website: celebrate_1.Joi.string()
                .example('https://web1.anasource.com/trainee2021/')
                .description('Website of CustomerSignUp'),
            UserProfilePicture: celebrate_1.Joi.string()
                .example('abcdefg')
                .description('UserProfilePicture of CustomerSignUp'),
            IsRegisteredUser: celebrate_1.Joi.boolean()
                .example(true)
                .description('IsRegisteredUser field of CustomerSignUp'),
            PaymentGatewayUserRef: celebrate_1.Joi.string()
                .example('A12BB')
                .description('PaymentGatewayUserRef of CustomerSignUp'),
            ZipCode: celebrate_1.Joi.string()
                .example('A12BB')
                .description('ZipCode of CustomerSignUp'),
            WorksWithPets: celebrate_1.Joi.boolean()
                .example(true)
                .description('WorksWithPets field of CustomerSignUp'),
            LanguageId: celebrate_1.Joi.number()
                .integer()
                .example(22)
                .description('LanguageId of CustomerSignUp'),
            NationalityId: celebrate_1.Joi.number()
                .integer()
                .example(22)
                .description('NationalityId of CustomerSignUp'),
            ResetKey: celebrate_1.Joi.string()
                .example('22')
                .description('ResetKey of CustomerSignUp'),
            ModifiedBy: celebrate_1.Joi.number()
                .integer()
                .example(1234)
                .description('ModifiedBy field of CustomerSignUp'),
            IsApproved: celebrate_1.Joi.boolean()
                .example(true)
                .description('IsApproved field of CustomerSignUp'),
            IsActive: celebrate_1.Joi.boolean()
                .example(true)
                .description('IsActive field of CustomerSignUp'),
            IsDeleted: celebrate_1.Joi.boolean()
                .example(true)
                .description('IsDeleted field of CustomerSignUp'),
            Status: celebrate_1.Joi.number()
                .example(1234)
                .description('Status of CustomerSignUp'),
            IsOnline: celebrate_1.Joi.boolean()
                .example(true)
                .description('IsOnline field of CustomerSignUp'),
            BankTokenId: celebrate_1.Joi.string()
                .example('ABCD')
                .description('BankTokenId of CustomerSignUp'),
            TaxNo: celebrate_1.Joi.string()
                .example('ABCD')
                .description('TaxNo of CustomerSignUp')
        })
    },
    spsignup_update: {
        params: params,
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .example('Max')
                .description('FirstName of CustomerSignUp'),
            LastName: celebrate_1.Joi.string()
                .example('Jones')
                .description('LastName of CustomerSignUp'),
            Email: celebrate_1.Joi.string()
                .email()
                .example('abc@gmail.com')
                .description('Email of CustomerSignUp'),
            Password: celebrate_1.Joi.string()
                .example('hbwgiwrbg')
                .description('Password of CustomerSignUp'),
            Mobile: celebrate_1.Joi.number()
                .integer()
                .example(987654321)
                .description('Mobile of CustomerSignUp'),
            RoleId: celebrate_1.Joi.number()
                .integer()
                .example(123)
                .description('RoleId of CustomerSignUp'),
            Gender: celebrate_1.Joi.number()
                .integer()
                .example('1')
                .description('Gender of CustomerSignUp'),
            DateOfBirth: celebrate_1.Joi.date()
                .example('2022-02-02 18:00:52.044+05:30')
                .description('Date of CustomerSignUp'),
            Website: celebrate_1.Joi.string()
                .example('https://web1.anasource.com/trainee2021/')
                .description('Website of CustomerSignUp'),
            UserProfilePicture: celebrate_1.Joi.string()
                .example('abcdefg')
                .description('UserProfilePicture of CustomerSignUp'),
            IsRegisteredUser: celebrate_1.Joi.boolean()
                .example(true)
                .description('IsRegisteredUser field of CustomerSignUp'),
            PaymentGatewayUserRef: celebrate_1.Joi.string()
                .example('A12BB')
                .description('PaymentGatewayUserRef of CustomerSignUp'),
            ZipCode: celebrate_1.Joi.string()
                .example('A12BB')
                .description('ZipCode of CustomerSignUp'),
            WorksWithPets: celebrate_1.Joi.boolean()
                .example(true)
                .description('WorksWithPets field of CustomerSignUp'),
            LanguageId: celebrate_1.Joi.number()
                .integer()
                .example(22)
                .description('LanguageId of CustomerSignUp'),
            NationalityId: celebrate_1.Joi.number()
                .integer()
                .example(22)
                .description('NationalityId of CustomerSignUp'),
            ResetKey: celebrate_1.Joi.string()
                .example('22')
                .description('ResetKey of CustomerSignUp'),
            ModifiedBy: celebrate_1.Joi.number()
                .integer()
                .example(1234)
                .description('ModifiedBy field of CustomerSignUp'),
            IsApproved: celebrate_1.Joi.boolean()
                .example(true)
                .description('IsApproved field of CustomerSignUp'),
            IsActive: celebrate_1.Joi.boolean()
                .example(true)
                .description('IsActive field of CustomerSignUp'),
            IsDeleted: celebrate_1.Joi.boolean()
                .example(true)
                .description('IsDeleted field of CustomerSignUp'),
            Status: celebrate_1.Joi.number()
                .integer()
                .example(1234)
                .description('Status of CustomerSignUp'),
            IsOnline: celebrate_1.Joi.boolean()
                .example(true)
                .description('IsOnline field of CustomerSignUp'),
            BankTokenId: celebrate_1.Joi.string()
                .example('ABCD')
                .description('BankTokenId of CustomerSignUp'),
            TaxNo: celebrate_1.Joi.string()
                .example('ABCD')
                .description('TaxNo of CustomerSignUp')
        })
    }
};
