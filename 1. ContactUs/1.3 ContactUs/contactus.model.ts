import {Joi} from "celebrate"

const params:Object = {
    ContactUsID: Joi.number()
            .integer()
            .required()
            .description('Id of User')
};

export const ContactUsSchema = {
        get: {
                params: params
        },

        add: {
                body: Joi.object({
                
                Name: Joi.string()
                        .required()
                        .example('Dhairya')
                        .description('Name of user'),
                
                Email: Joi.string()
                                .required()
                                .email()
                                .example('abc@gmail.com')
                                .description('email of user'),
                
                Subject: Joi.string()
                                .required()
                                .example('General')
                                .description('Subject'),
                
                PhoneNumber: Joi.number()
                                // .length field doesn't work on number
                                // .length(10)
                                // .pattern(/^[0-9]+$/)
                                .required()
                                .example('1234567890')
                                .description('Phone Number of user'),
                
                Message: Joi.string()
                                .required()
                                .example('hello')
                                .description('Message'),
                
                UploadFileName: Joi.string()
                                .example('abc.pdf')
                                .description('File'),

                FilePath: Joi.string()
                                .example('abc.pdf')
                                .description('Filepath of ContactUs'),
                
                CreatedBy: Joi.number()
                                .integer()
                                .example('abc')
                                .description('CreatedBy')
        })
    }
}