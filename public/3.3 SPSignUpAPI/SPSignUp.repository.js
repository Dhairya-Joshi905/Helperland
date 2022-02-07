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
exports.SPSignUpRepository = void 0;
const index_1 = require("../models/index");
class SPSignUpRepository {
    createSPSignUp(SPSignUp) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.create(SPSignUp);
        });
    }
    getSPSignUpById(SPSignUpId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findOne({ where: { id: SPSignUpId } });
        });
    }
    getAllSPSignUp() {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.findAll();
        });
    }
    updateSPSignUp(SPSignUp, SPSignUpId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.update(SPSignUp, { where: { id: SPSignUpId } });
        });
    }
    deleteSPSignUp(SPSignUpId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.User.destroy({ where: { id: SPSignUpId } });
        });
    }
}
exports.SPSignUpRepository = SPSignUpRepository;
