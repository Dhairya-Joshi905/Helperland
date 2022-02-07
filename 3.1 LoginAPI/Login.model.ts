import {Joi} from "celebrate"

export const LoginSchema = {
    login_check: {
        body: Joi.object({
            Email: Joi.string()
                    .required()
                    .email()
                    .example('abc@gmail.com')
                    .description('Email of User'),
            Password: Joi.string()
                .required()
                .description('password'),
        })
    },
}