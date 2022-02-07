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
exports.ForgotPasswordController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailgun_js_1 = __importDefault(require("mailgun-js"));
require("dotenv").config();
const DOMAIN = process.env.MAILGUN_DOMAIN;
const mgun = (0, mailgun_js_1.default)({
    apiKey: process.env.MAILGUN_API,
    domain: DOMAIN,
});
const salt = 10;
class ForgotPasswordController {
    constructor(ForgotPasswordService) {
        this.ForgotPasswordService = ForgotPasswordService;
        this.forgotPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const Email = req.body.Email;
            if (Email) {
                return this.ForgotPasswordService
                    .getUserByEmail(Email)
                    .then((user) => {
                    if (!user)
                        return res.status(400).json({ message: "No user found" });
                    const resetLink = this.ForgotPasswordService.createToken(user.UserId);
                    const data = this.ForgotPasswordService.createData(user.Email, resetLink);
                    // Change this any type
                    mgun.messages().send(data, function (err, body) {
                        if (err)
                            return res.json({ error: err.message });
                    });
                    return res.status(200).json({ message: "Email sent" });
                })
                    .catch((error) => {
                    console.log(error);
                    return res.status(500).json(error);
                });
            }
            else
                return res.status(400).json({ message: "Invalid Email" });
        });
        this.resetPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const resetLink = req.body.resetLink;
            if (resetLink) {
                jsonwebtoken_1.default.verify(resetLink, process.env.FORGOT_PASSWORD, (error, decodedlink) => {
                    if (error) {
                        return res.status(401).json({ message: "Token not valid" });
                    }
                    const userId = decodedlink.userId;
                    return this.ForgotPasswordService
                        .getUserById(userId)
                        .then((user) => __awaiter(this, void 0, void 0, function* () {
                        if (!user)
                            return res.status(400).json({ error: "User does not exist" });
                        const oldPassword = yield bcrypt_1.default.compare(req.body.newPassword, user.Password);
                        if (oldPassword)
                            return res.status(200).json({ message: "Old Password. Choose a fresh one." });
                        else {
                            user.Password = yield bcrypt_1.default.hash(req.body.newPassword, salt);
                            return this.ForgotPasswordService
                                .updateUserPassword(user.Password, user.UserId)
                                .then((user) => {
                                return res.status(200).json({ message: "password changed", user });
                            })
                                .catch((err) => {
                                console.log(err);
                                return res.status(500).json(err);
                            });
                        }
                    }))
                        .catch((err) => {
                        console.log(err);
                        return res.status(500).json(err);
                    });
                });
            }
            else
                return res.status(400).json({ message: "some client side error" });
        });
        this.ForgotPasswordService = ForgotPasswordService;
    }
}
exports.ForgotPasswordController = ForgotPasswordController;
