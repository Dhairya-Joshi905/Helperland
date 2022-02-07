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
exports.CustomerSignUpService = void 0;
class CustomerSignUpService {
    constructor(CustomerSignUpRepository) {
        this.CustomerSignUpRepository = CustomerSignUpRepository;
        this.CustomerSignUpRepository = CustomerSignUpRepository;
    }
    createCustomerSignUp(CustomerSignUp) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.CustomerSignUpRepository.createCustomerSignUp(CustomerSignUp);
        });
    }
    getCustomerSignUpById(CustomerSignUpId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.CustomerSignUpRepository.getCustomerSignUpById(CustomerSignUpId);
        });
    }
    getAllCustomerSignUp() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.CustomerSignUpRepository.getAllCustomerSignUp();
        });
    }
    updateCustomerSignUp(CustomerSignUp, CustomerSignUpId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.CustomerSignUpRepository.updateCustomerSignUp(CustomerSignUp, CustomerSignUpId);
        });
    }
    deleteCustomerSignUp(CustomerSignUpId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.CustomerSignUpRepository.deleteCustomerSignUp(CustomerSignUpId);
        });
    }
}
exports.CustomerSignUpService = CustomerSignUpService;
