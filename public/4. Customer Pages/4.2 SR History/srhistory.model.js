"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SRHistorySchema = void 0;
var celebrate_1 = require("celebrate");
var header = {
    authorization: celebrate_1.Joi.string()
        .required()
};
exports.SRHistorySchema = {
    Ratings: {
        body: celebrate_1.Joi.object({
            Comments: celebrate_1.Joi.string()
                .example('comment')
                .description('comment'),
            OnTimeArrival: celebrate_1.Joi
                .number()
                .example(5),
            Friendly: celebrate_1.Joi
                .number()
                .example(5),
            QualityOfService: celebrate_1.Joi
                .number()
                .example(5)
        })
    }
};
