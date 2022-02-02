import { Joi } from 'celebrate';

const params: object = {
    id: Joi.number()
        .integer()
        .required()
        .description('Id of ContactUs')
};

export const ContactUsSchema = {
    cuget: {
        params: params
    },
    cuadd: {
        body: Joi.object({
            FirstName: Joi.string()
                .required()
                .example('Max')
                .description('firstName of ContactUs'),
            LastName: Joi.string()
                .example('Jones')
                .description('lastName of ContactUs'),
            Email: Joi.string()
                .email()
                .example('abc@gmail.com')
                .description('email of ContactUs'),
            SubjectType: Joi.string()
                .example('abcdefg')
                .description('SubjectType of ContactUs'),
            Subject: Joi.string()
                .example('abcdefg')
                .description('Subject of ContactUs'),
            PhoneNumber: Joi.string()
                .required()
                .example('987654321')
                .description('PhoneNumber of ContactUs'),
            Message: Joi.string()
                .required()
                .example('abcdefg')
                .description('Message of ContactUs'),
            UploadFileName: Joi.string()
                .example('abcdefg')
                .description('UploadFileName of ContactUs'),
            Status: Joi.number()
                .integer()
                .example(12345)
                .description('Status of ContactUs'),
            Priority: Joi.number()
                .integer()
                .example(12345)
                .description('Priority of ContactUs'),
            AssignedToUser: Joi.number()
                .integer()
                .example(12345)
                .description('AssignedToUser field of ContactUs'),
        })
    },
    cuupdate: {
        params: params,
        body: Joi.object({
            FirstName: Joi.string()
                .required()
                .example('Max')
                .description('firstName of ContactUs'),
            LastName: Joi.string()
                .example('Jones')
                .description('lastName of ContactUs'),
            Email: Joi.string()
                .email()
                .example('abc@gmail.com')
                .description('email of ContactUs'),
            SubjectType: Joi.string()
                .example('abcdefg')
                .description('SubjectType of ContactUs'),
            Subject: Joi.string()
                .example('abcdefg')
                .description('Subject of ContactUs'),
            PhoneNumber: Joi.string()
                .required()
                .example('987654321')
                .description('PhoneNumber of ContactUs'),
            Message: Joi.string()
                .required()
                .example('abcdefg')
                .description('Message of ContactUs'),
            UploadFileName: Joi.string()
                .example('abcdefg')
                .description('UploadFileName of ContactUs'),
            Status: Joi.number()
                .integer()
                .example(12345)
                .description('Status of ContactUs'),
            Priority: Joi.number()
                .integer()    
                .example(12345)
                .description('Priority of ContactUs'),
            AssignedToUser: Joi.number()
                .integer()
                .example(12345)
                .description('AssignedToUser field of ContactUs'),
        })
    }
};
