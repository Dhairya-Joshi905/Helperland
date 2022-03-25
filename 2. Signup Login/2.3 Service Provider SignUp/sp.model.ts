import {Joi} from "celebrate"

const params:Object = {
    UserId: Joi.number()
            .integer()
            .required()
            .description('Id of User')
};

export const HelperSchema = {
    get: {
        params: params
    },
    validate: {
        body: Joi.object({
            FirstName: Joi.string()
                .required()
                .example('Dhairya')
                .description('FirstName of helper'),
            LastName: Joi.string()
                .required()
                .example('Joshi')
                .description('LastName of helper'),
            Email: Joi.string()
                    .required()
                    .email()
                    .example('abc@gmail.com')
                    .description('email of helper'),
            Password: Joi.string()
                .required()
                .description('password'),
            ConfirmPassword: Joi.string()
                .required()
                .description('confirmPassword'),
            Mobile: Joi.string()
                .length(10)
                .pattern(/^[0-9]+$/)
                .required()
                .example('1234567890')
                .description('Phone Number of helper'),
            ZipCode: Joi.string()
                .required()
                .example('380015')
                .description('Zip code')
        })
    }
}