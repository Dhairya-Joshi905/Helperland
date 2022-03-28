"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookServiceSchema = void 0;
var celebrate_1 = require("celebrate");
var header = {
    authorization: celebrate_1.Joi
        .string()
        .required()
};
exports.BookServiceSchema = {
    zipcode: {
        body: celebrate_1.Joi.object({
            postalcode: celebrate_1.Joi
                .string()
                .required()
                .example('380015')
                .description('ZipCode')
        })
    },
    userAddress: {
        body: celebrate_1.Joi.object({
            Addressline1: celebrate_1.Joi
                .string()
                .required()
                .example('My House')
                .description('Address'),
            Addressline2: celebrate_1.Joi
                .string()
                .example('Near this')
                .description('Address'),
            City: celebrate_1.Joi
                .string()
                .required()
                .example('Ahmedabad')
                .description('City'),
            State: celebrate_1.Joi
                .string()
                .example('Gujarat')
                .description('State'),
            // PostalCode: Joi
            //         .string()
            //         .required()
            //         .example('380015')
            //         .description('ZipCode'),
            IsDefault: celebrate_1.Joi
                .boolean()
                .required()
                .example(true),
            IsDeleted: celebrate_1.Joi
                .boolean()
                .required()
                .example(false),
            // Email: Joi.string()
            //         .required()
            //         .email()
            //         .example('abc@gmail.com')
            //         .description('email of user'),
            Mobile: celebrate_1.Joi
                .string()
                .length(10)
                .pattern(/^[0-9]+$/)
                .example('1234567890')
                .description('User mobile number')
        })
    },
    createService: {
        body: celebrate_1.Joi.object({
            ServiceId: celebrate_1.Joi
                .number()
                .integer()
                .required()
                .example(1)
                .description('ServiceId'),
            ServiceStartDate: celebrate_1.Joi
                .string()
                .required()
                .example('01-01-2001')
                .description('Date'),
            ServiceStartTime: celebrate_1.Joi
                .string()
                .required()
                .example('09:35')
                .description('Time'),
            // ZipCode: Joi.string()
            //                 .required()
            //                 .example('380015')
            //                 .description('ZipCode'),
            ServiceHours: celebrate_1.Joi
                .number()
                .integer()
                .required()
                .example(2)
                .description('Service Hours'),
            Comments: celebrate_1.Joi
                .string()
                .example('Hello')
                .description('comment'),
            PaymentDue: celebrate_1.Joi
                .boolean()
                .required()
                .example('true'),
            HasPets: celebrate_1.Joi
                .boolean()
                .required()
                .example(false)
                .description('Have pets at home'),
            ServiceRequestAddress: celebrate_1.Joi
                .object()
                .required(),
            ExtraService: celebrate_1.Joi.array()
        })
    }
};
