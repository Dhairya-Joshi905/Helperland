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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
class ForgotPasswordService {
    constructor(ForgotPasswordRepository) {
        this.ForgotPasswordRepository = ForgotPasswordRepository;
        this.ForgotPasswordRepository = ForgotPasswordRepository;
    }
    getUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ForgotPasswordRepository.getUserByEmail(userEmail);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ForgotPasswordRepository.getUserById(userId);
        });
    }
    createData(Email, token) {
        const data = {
            from: 'teamhelperland@gmail.com',
            to: Email,
            subject: 'Password reset link',
            html: `<h1>Please click here to reset your password</h1>
              <a href="${process.env.CLIENT_URL}/resetpassword/${token}">Click here to change password.</a>`
        };
        return data;
    }
    createToken(userId) {
        const token = jsonwebtoken_1.default.sign({ userId }, process.env.FORGOT_PASSWORD, { expiresIn: '10m' });
        return token;
    }
    updateUserPassword(userPassword, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ForgotPasswordRepository.updateUserPassword(userPassword, userId);
        });
    }
}
exports.ForgotPasswordService = ForgotPasswordService;
