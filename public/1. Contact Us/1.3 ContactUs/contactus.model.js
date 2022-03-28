"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    ContactUsID: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of User')
};
exports.ContactUsSchema = {
    get: {
        params: params
    },
    add: {
        body: celebrate_1.Joi.object({
            Name: celebrate_1.Joi.string()
                .required()
                .example('Dhairya')
                .description('Name of user'),
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of user'),
            Subject: celebrate_1.Joi.string()
                .required()
                .example('General')
                .description('Subject'),
            PhoneNumber: celebrate_1.Joi.number()
                // .length field doesn't work on number
                // .length(10)
                // .pattern(/^[0-9]+$/)
                .required()
                .example('1234567890')
                .description('Phone Number of user'),
            Message: celebrate_1.Joi.string()
                .required()
                .example('hello')
                .description('Message'),
            UploadFileName: celebrate_1.Joi.string()
                .example('abc.pdf')
                .description('File'),
            FilePath: celebrate_1.Joi.string()
                .example('abc.pdf')
                .description('Filepath of ContactUs'),
            CreatedBy: celebrate_1.Joi.number()
                .integer()
                .example('abc')
                .description('CreatedBy')
        })
    }
};
