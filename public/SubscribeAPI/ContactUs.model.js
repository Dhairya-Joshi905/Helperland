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
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('Max')
                .description('firstName of ContactUs'),
            LastName: celebrate_1.Joi.string()
                .example('Jones')
                .description('lastName of ContactUs'),
            Email: celebrate_1.Joi.string()
                .email()
                .example('abc@gmail.com')
                .description('email of ContactUs'),
            SubjectType: celebrate_1.Joi.string()
                .example('abcdefg')
                .description('SubjectType of ContactUs'),
            Subject: celebrate_1.Joi.string()
                .example('abcdefg')
                .description('Subject of ContactUs'),
            PhoneNumber: celebrate_1.Joi.string()
                .required()
                .example('987654321')
                .description('PhoneNumber of ContactUs'),
            Message: celebrate_1.Joi.string()
                .required()
                .example('abcdefg')
                .description('Message of ContactUs'),
            UploadFileName: celebrate_1.Joi.string()
                .example('abcdefg')
                .description('UploadFileName of ContactUs'),
            Status: celebrate_1.Joi.number()
                .integer()
                .example(12345)
                .description('Status of ContactUs'),
            Priority: celebrate_1.Joi.number()
                .integer()
                .example(12345)
                .description('Priority of ContactUs'),
            AssignedToUser: celebrate_1.Joi.number()
                .integer()
                .example(12345)
                .description('AssignedToUser field of ContactUs'),
        })
    },
    update: {
        params: params,
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string()
                .required()
                .example('Max')
                .description('firstName of ContactUs'),
            LastName: celebrate_1.Joi.string()
                .example('Jones')
                .description('lastName of ContactUs'),
            Email: celebrate_1.Joi.string()
                .email()
                .example('abc@gmail.com')
                .description('email of ContactUs'),
            SubjectType: celebrate_1.Joi.string()
                .example('abcdefg')
                .description('SubjectType of ContactUs'),
            Subject: celebrate_1.Joi.string()
                .example('abcdefg')
                .description('Subject of ContactUs'),
            PhoneNumber: celebrate_1.Joi.string()
                .required()
                .example('987654321')
                .description('PhoneNumber of ContactUs'),
            Message: celebrate_1.Joi.string()
                .required()
                .example('abcdefg')
                .description('Message of ContactUs'),
            UploadFileName: celebrate_1.Joi.string()
                .example('abcdefg')
                .description('UploadFileName of ContactUs'),
            Status: celebrate_1.Joi.number()
                .integer()
                .example(12345)
                .description('Status of ContactUs'),
            Priority: celebrate_1.Joi.number()
                .integer()
                .example(12345)
                .description('Priority of ContactUs'),
            AssignedToUser: celebrate_1.Joi.number()
                .integer()
                .example(12345)
                .description('AssignedToUser field of ContactUs'),
        })
    }
};
