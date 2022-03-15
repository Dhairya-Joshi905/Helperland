import {Joi} from "celebrate"

const header: Object = {
    authorization:  Joi.string()
                    .required()
};

export const ProfileSchema = {
        UpdateUser: {
                body: Joi.object({
                        FirstName: Joi.string()
                                .required()
                                .example('D')
                                .description('FirstName'),

                        LastName: Joi.string()
                                .required()
                                .example('J')
                                .description('LastName'),

                        Mobile: Joi.string()
                                .length(10)
                                .required()
                                .example('9876543210')
                                .description('Phone Number'),

                        DateOfBirth: Joi.string()
                                .required()
                                .example('01-01-2000')
                                .description('birth date'),

                        LanguageId: Joi.number()
                                .integer()
                                .required()
                                .example(1)
                                .description('language Id')
                })
        },

        UpdateCreateUserAddress: {
                body: Joi.object({

                        StreetName: Joi.string()
                                        .required()
                                        .example('D')
                                        .description('FirstName'),

                        HouseNumber: Joi.string()
                                        .required()
                                        .example('J')
                                        .description('LastName'),

                        PostalCode: Joi.string()
                                        .required()
                                        .example('380015')
                                        .description('Zip code'),

                        City: Joi.string()
                                .required()
                                .example('Abad')
                                .description('City'),
                        
                        Mobile: Joi.string()
                                .required()
                                .length(10)
                                .example('9876543210')
                                .description('Phone Number')
                })
        },

        ChangePassword: {
                body: Joi.object({

                        OldPassword: Joi.string()
                                        .required()
                                        .example('abcd1234')
                                        .description('old password'),
                        
                        NewPassword: Joi.string()
                                        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                                        .required()
                                        .example('1234abcd')
                                        .description('new password'),
                        
                        ConfirmPassword: Joi.string()
                                        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
                                        .required()
                                        .example('1234abcd')
                                        .description('password')
                })
        }
}