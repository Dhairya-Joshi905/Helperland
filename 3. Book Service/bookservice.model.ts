import {Joi} from "celebrate"

export const BookServiceSchema = {
    zipcode: {
        body: Joi.object({
                postalcode: Joi
                        .string()
                        .required()
                        .example('380015')
                        .description('ZipCode')
        })
    },
    userAddress: {
        body: Joi.object({
                Addressline1: Joi
                        .string()
                        .required()
                        .example('My house')
                        .description('Address Line 1'),
                
                Addressline2: Joi
                        .string()
                        .example('Near this')
                        .description('Address Line 2'),
                
                City: Joi
                        .string()
                        .required()
                        .example('Ahmedabad')
                        .description('City'),
                
                State: Joi
                        .string()
                        .example('Gujarat')
                        .description('State'),
                
                IsDefault: Joi
                        .boolean()
                        .required()
                        .example(true),
                
                IsDeleted: Joi
                        .boolean()
                        .required()
                        .example(false),
                
                Mobile: Joi
                        .string()
                        .example('1234567890')
                        .description('Mobile number')
        })
    },

    createService: {
        body: Joi.object({
                ServiceId: Joi
                        .number()
                        .integer()
                        .required()
                        .example(1)
                        .description('ServiceId'),
                
                ServiceStartDate: Joi
                        .date()
                        .required()
                        .example('01-01-2001')
                        .description('Service Start Date'),
                
                ServiceStartTime: Joi
                        .string()
                        .required()
                        .example('09:35')
                        .description('Time'),
                
                ServiceHours: Joi
                        .number()
                        .integer()
                        .required()
                        .example('2')
                        .description('Service Hours'),
                
                Comments: Joi
                        .string()
                        .example('Good')
                        .description('Comment'),
                
                PaymentDue: Joi
                        .boolean()
                        .required()
                        .example(true),
                
                HasPets: Joi
                        .boolean()
                        .required()
                        .example(false)
                        .description('Has pets field'),
                
                ServiceRequestAddress: Joi
                        .object()
                        .required(),
                
                ExtraService: Joi.array()
        })
    },
}

