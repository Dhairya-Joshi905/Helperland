import {Joi} from "celebrate"

const params: Object = {
    UserId: Joi.number()
            .integer()
            .required()
            .description('Id of User')
};

export const UserSchema = {
    get: {
        params: params
    },
    add: {
        body: Joi.object({
            FirstName: Joi.string()
                .required()
                .example('Dhairya')
                .description('FirstName of user'),
            LastName: Joi.string()
                .required()
                .example('Joshi')
                .description('LastName of user'),
            Email: Joi.string()
                .required()
                .email()
                .example('abc@gmail.com')
                .description('email of user'),
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
                .description('Phone Number of user'),
            ZipCode: Joi.string()
                .required()
                .example('380015')
                .description('Zip code')
        })
    }
}