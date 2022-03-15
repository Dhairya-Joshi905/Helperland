"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardSchema = void 0;
var celebrate_1 = require("celebrate");
var header = {
    authorization: celebrate_1.Joi
        .string()
        .required()
};
var params1 = {
    id: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of User')
};
exports.DashboardSchema = {
    GetDashboard: {
        params: params1
    },
    RescheduleSR: {
        body: celebrate_1.Joi.object({
            date: celebrate_1.Joi.string()
                .required()
                .example('15-03-2022')
                .description('date'),
            time: celebrate_1.Joi.string()
                .required()
                .example('21:35')
                .description('time')
        })
    },
    CancelSR: {
        body: celebrate_1.Joi.object({
            comment: celebrate_1.Joi.string()
                .example('cancel sr comment')
                .description('comment')
        })
    }
};
