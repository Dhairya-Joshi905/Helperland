import {Joi} from "celebrate"

const header: Object = {
    authorization:  Joi.string()
                        .required()
};

export const MySettingsSchema = {
    UpdateUser: {
        body: Joi.object({
                FirstName: Joi.string()
                                .required()
                                .example('Dhairya')
                                .description('FirstName of user'),

                LastName: Joi.string()
                                .required()
                                .example('Joshi')
                                .description('LastName of user'),

                Mobile: Joi.string()
                                .length(10)
                                .required()
                                .example('9876543210')
                                .description('Phone Number of user'),

                DateOfBirth: Joi.string()
                                .required()
                                .example('01-01-2000')
                                .description('birth date of user'),

                NationalityId: Joi.number()
                                .integer()
                                .required()
                                .example(1)
                                .description('language spoken by you'),

                Gender: Joi.string()
                                .required()
                                .example('Male/Female')
                                .description('Gender'),

                Address: Joi.object()
                                .required()
                                .description('address')
           
        })
    },

    ChangePassword: {
        body: Joi.object({
                OldPassword: Joi.string()
                                .required()
                                .example('admin')
                                .description('password'),

                NewPassword: Joi.string()
                                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                                .required()
                                .example('abcd1234')
                                .description('password'),

                ConfirmPassword: Joi.string()
                                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                                .required()
                                .example('abcd1234')
                                .description('password')
        })
    },
}