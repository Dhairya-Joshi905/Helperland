"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSignUpController = void 0;
class CustomerSignUpController {
    constructor(CustomerSignUpService) {
        this.CustomerSignUpService = CustomerSignUpService;
        this.createCustomerSignUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.CustomerSignUpService
                .createCustomerSignUp(req.body)
                .then((CustomerSignUp) => {
                return res.status(200).json({ CustomerSignUp });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.getCustomerSignUpById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.CustomerSignUpService
                .getCustomerSignUpById(+req.params.id)
                .then((CustomerSignUp) => {
                if (CustomerSignUp) {
                    return res.status(200).json({ CustomerSignUp });
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.getAllCustomerSignUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.CustomerSignUpService
                .getAllCustomerSignUp()
                .then((CustomerSignUp) => {
                return res.status(200).json({ CustomerSignUp });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.updateCustomerSignUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.CustomerSignUpService
                .updateCustomerSignUp(req.body, +req.params.id)
                .then((CustomerSignUp) => {
                return res.status(200).json({ CustomerSignUp });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.deleteCustomerSignUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.CustomerSignUpService
                .deleteCustomerSignUp(+req.params.id)
                .then((CustomerSignUp) => {
                if (CustomerSignUp > 0) {
                    return res.status(200).json({ CustomerSignUp });
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.CustomerSignUpService = CustomerSignUpService;
    }
}
exports.CustomerSignUpController = CustomerSignUpController;
