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
exports.SPSignUpService = void 0;
class SPSignUpService {
    constructor(SPSignUpRepository) {
        this.SPSignUpRepository = SPSignUpRepository;
        this.SPSignUpRepository = SPSignUpRepository;
    }
    createSPSignUp(SPSignUp) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.SPSignUpRepository.createSPSignUp(SPSignUp);
        });
    }
    getSPSignUpById(SPSignUpId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.SPSignUpRepository.getSPSignUpById(SPSignUpId);
        });
    }
    getAllSPSignUp() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.SPSignUpRepository.getAllSPSignUp();
        });
    }
    updateSPSignUp(SPSignUp, SPSignUpId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.SPSignUpRepository.updateSPSignUp(SPSignUp, SPSignUpId);
        });
    }
    deleteSPSignUp(SPSignUpId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.SPSignUpRepository.deleteSPSignUp(SPSignUpId);
        });
    }
}
exports.SPSignUpService = SPSignUpService;
