import {Joi} from "celebrate"

const header:Object = {
        authorization:  Joi.string()
                        .required()
};
    
export const ServiceHistorySchema = {        
        Ratings: {
                body: Joi.object({
                        
                        Comments: Joi.string()
                                        .example('comment')
                                        .description('comment'),
                        
                        OnTimeArrival: Joi
                                        .number()
                                          .example(5),
                        
                        Friendly: Joi
                                .number()
                                .example(5),
                        
                        QualityOfService: Joi
                                        .number()
                                        .example(5)
                })
        }
}