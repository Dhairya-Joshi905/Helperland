import {Joi} from "celebrate"

const header: Object = {
    authorization:  Joi.string()
                       .required()
};

const params1: object = {
    id: Joi.number()
           .integer()
           .required()
           .description('Id of User')
};

export const NewServiceRequestSchema = {
    
    EditRescheduleSR: {
        body: Joi.object({

            Addressline1: Joi.string()
                             .required()
                             .example('ABC')
                             .description('Street name'),

            Addressline2: Joi.string()
                             .required()
                             .example('8')
                             .description('House number'),

            City: Joi.string()
                     .required()
                     .example('Ahmedabad')
                     .description('City'),

            Notes: Joi.string()
                      .example('Comment')
                      .description('Comment'),

            PostalCode: Joi.string()
                           .required()
                           .example('380015')
                           .description('Zip code'),

            RescheduleReason: Joi.string()
                                 .example('Reschedule Reason')
                                 .description('Reschedule Reason'),

            ServiceRequestId: Joi.number()
                                 .required()
                                 .example('4')
                                 .description('Service request id'),

            ServiceStartDate: Joi.string()
                                 .required()
                                 .example('18/02/2001')
                                 .description('Date'),

            ServiceTime: Joi.string()
                            .required()
                            .example('21:35')
                            .description('Time'),
        })
    }
}