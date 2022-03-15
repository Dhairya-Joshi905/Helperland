import {Joi} from "celebrate"

const header: Object = {
        authorization:  Joi
                    .string()
                    .required()
};

const params1: object = {
        id: Joi.number()
            .integer()
            .required()
            .description('Id of User')
};

export const DashboardSchema = {
        GetDashboard: {
                params: params1
        },

        RescheduleSR: {
                body: Joi.object({
                        date: Joi.string()
                                .required()
                                .example('15-03-2022')
                                .description('date'),
                        
                        time: Joi.string()
                                .required()
                                .example('21:35')
                                .description('time')
                        
                })
        },

        CancelSR: {
                body: Joi.object({
                        comment: Joi.string()
                                .example('cancel sr comment')
                                .description('comment')
                })
        }
}

