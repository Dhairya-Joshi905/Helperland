import { Joi } from 'celebrate';

const params: object = {
    
    id: Joi.number()
        .integer()
        .required()
        .description('Id of CustomerSignUp')
};

export const CustomerSignUpSchema = {
    csignup_get: {
        params: params
    },
    csignup_add: {
        body: Joi.object({
            
            FirstName: Joi.string()
                .example('Max')
                .description('FirstName of CustomerSignUp'),
            
            LastName: Joi.string()
                .example('Jones')
                .description('LastName of CustomerSignUp'),
            
            Email: Joi.string()
                .email()
                .example('abc@gmail.com')
                .description('Email of CustomerSignUp'),
            
            Password: Joi.string()
                .example('hbwgiwrbg')
                .description('Password of CustomerSignUp'),
            
            Mobile: Joi.number()
                .integer()
                .example(987654321)
                .description('Mobile of CustomerSignUp'),

            RoleId: Joi.number()
                .integer()
                .example(123)
                .description('RoleId of CustomerSignUp'),

            Gender: Joi.number()
                .integer()
                .example('1')
                .description('Gender of CustomerSignUp'),

            DateOfBirth: Joi.date()
                .example('2022-02-02 18:00:52.044+05:30')
                .description('Date of CustomerSignUp'),
            
            Website: Joi.string()
                .example('https://web1.anasource.com/trainee2021/')
                .description('Website of CustomerSignUp'),
            
            UserProfilePicture: Joi.string()
                .example('abcdefg')
                .description('UserProfilePicture of CustomerSignUp'),
            
            IsRegisteredUser: Joi.boolean()
                
                .example(true)
                .description('IsRegisteredUser field of CustomerSignUp'),
            
            PaymentGatewayUserRef: Joi.string()
                .example('A12BB')
                .description('PaymentGatewayUserRef of CustomerSignUp'),
            
            ZipCode: Joi.string()
                .example('A12BB')
                .description('ZipCode of CustomerSignUp'),
            
            WorksWithPets: Joi.boolean()
                .example(true)
                .description('WorksWithPets field of CustomerSignUp'),
            
            LanguageId: Joi.number()
                .integer()
                .example(22)
                .description('LanguageId of CustomerSignUp'),

            NationalityId: Joi.number()
                .integer()
                .example(22)
                .description('NationalityId of CustomerSignUp'),

            ResetKey: Joi.string()
                .example('22')
                .description('ResetKey of CustomerSignUp'),

            ModifiedBy: Joi.number()
                .integer()
                .example(1234)
                .description('ModifiedBy field of CustomerSignUp'),
            
            IsApproved: Joi.boolean()
                .example(true)
                .description('IsApproved field of CustomerSignUp'),

            IsActive: Joi.boolean()
                .example(true)
                .description('IsActive field of CustomerSignUp'),

            IsDeleted: Joi.boolean()
                .example(true)
                .description('IsDeleted field of CustomerSignUp'),

            Status: Joi.number()
                .example(1234)
                .description('Status of CustomerSignUp'),

            IsOnline: Joi.boolean()
                .example(true)
                .description('IsOnline field of CustomerSignUp'),

            BankTokenId: Joi.string()
                .example('ABCD')
                .description('BankTokenId of CustomerSignUp'),

            TaxNo: Joi.string()
                .example('ABCD')
                .description('TaxNo of CustomerSignUp')
        })
    },
    
    csignup_update: {
        params: params,
        body: Joi.object({
            
            FirstName: Joi.string()
                
                .example('Max')
                .description('FirstName of CustomerSignUp'),
            
            LastName: Joi.string()
                
                .example('Jones')
                .description('LastName of CustomerSignUp'),
            
            Email: Joi.string()
                
                .email()
                .example('abc@gmail.com')
                .description('Email of CustomerSignUp'),
            
            Password: Joi.string()
                .example('hbwgiwrbg')
                .description('Password of CustomerSignUp'),
            
            Mobile: Joi.number()
                .integer()
                
                .example(987654321)
                .description('Mobile of CustomerSignUp'),

            RoleId: Joi.number()
                .integer()
                .example(123)
                .description('RoleId of CustomerSignUp'),

            Gender: Joi.number()
                .integer()
                .example('1')
                .description('Gender of CustomerSignUp'),

            DateOfBirth: Joi.date()
                .example('2022-02-02 18:00:52.044+05:30')
                .description('Date of CustomerSignUp'),
            
            Website: Joi.string()
                .example('https://web1.anasource.com/trainee2021/')
                .description('Website of CustomerSignUp'),
            
            UserProfilePicture: Joi.string()
                .example('abcdefg')
                .description('UserProfilePicture of CustomerSignUp'),
            
            IsRegisteredUser: Joi.boolean()
                
                .example(true)
                .description('IsRegisteredUser field of CustomerSignUp'),
            
            PaymentGatewayUserRef: Joi.string()
                .example('A12BB')
                .description('PaymentGatewayUserRef of CustomerSignUp'),
            
            ZipCode: Joi.string()
                .example('A12BB')
                .description('ZipCode of CustomerSignUp'),
            
            WorksWithPets: Joi.boolean()
                
                .example(true)
                .description('WorksWithPets field of CustomerSignUp'),
            
            LanguageId: Joi.number()
                .integer()
                .example(22)
                .description('LanguageId of CustomerSignUp'),

            NationalityId: Joi.number()
                .integer()
                .example(22)
                .description('NationalityId of CustomerSignUp'),

            ResetKey: Joi.string()
                .example('22')
                .description('ResetKey of CustomerSignUp'),

            ModifiedBy: Joi.number()
                .integer()
                
                .example(1234)
                .description('ModifiedBy field of CustomerSignUp'),
            
            IsApproved: Joi.boolean()
                
                .example(true)
                .description('IsApproved field of CustomerSignUp'),

            IsActive: Joi.boolean()
                
                .example(true)
                .description('IsActive field of CustomerSignUp'),

            IsDeleted: Joi.boolean()
                
                .example(true)
                .description('IsDeleted field of CustomerSignUp'),

            Status: Joi.number()
                .integer()
                .example(1234)
                .description('Status of CustomerSignUp'),

            IsOnline: Joi.boolean()
                
                .example(true)
                .description('IsOnline field of CustomerSignUp'),

            BankTokenId: Joi.string()
                .example('ABCD')
                .description('BankTokenId of CustomerSignUp'),

            TaxNo: Joi.string()
                .example('ABCD')
                .description('TaxNo of CustomerSignUp')
        })
    }
};
