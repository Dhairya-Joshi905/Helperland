import { Joi } from 'celebrate';

const params: object = {
    id: Joi.number()
        .integer()
        .required()
        .description('Id of Subscriber')
};

export const SubscribeSchema = {
    getSubscriber: {
        params: params
    },
    addSubscriber: {
        body: Joi.object({
            Email: Joi.string()
                    .email()
                    .example('abc@gmail.com')
                    .description('email of Subscriber')
        })
    }
};