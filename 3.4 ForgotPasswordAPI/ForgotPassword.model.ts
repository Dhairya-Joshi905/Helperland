import {Joi} from "celebrate"

export const ForgotPasswordSchema = {
    reset: {
        body: Joi.object({
            Email: Joi.string()
                    .required()
                    .email()
                    .example('abc@gmail.com')
                    .description('email of user')
        })
    },

    newpassword: {
        body: Joi.object({

            resetLink: Joi.string()
                    .required()
                    .description('reset link'),

            newPassword: Joi.string()
                    .required()
                    .description('new password of user')
        })
    }
}