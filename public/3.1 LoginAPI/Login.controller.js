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
exports.LoginController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv").config();
class LoginController {
    constructor(LoginService) {
        this.LoginService = LoginService;
        this.Login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.LoginService
                .getUserByEmail(req.body.Email)
                .then((User) => __awaiter(this, void 0, void 0, function* () {
                if (User) {
                    const registered = this.LoginService.IsRegistered(User);
                    if (registered) {
                        const ok = yield bcrypt_1.default.compare(req.body.Password, User.Password);
                        if (ok) {
                            const token = this.LoginService.createToken(User.Email);
                            if (User.RoleId === 1)
                                return res.status(200).json({ message: "user login successful" });
                            else if (User.RoleId === 2)
                                return res.status(200).json({ message: "service provider login successful" });
                            else
                                return res.status(200).json({ message: "admin login successful" });
                        }
                        return res.status(401).json({ message: "Invalid Username or Password" });
                    }
                    return res.status(401).json({ message: "Invalid Username or Password" });
                }
                return res.status(401).json({ message: "Invalid Username or Password" });
            }))
                .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    err: err,
                });
            });
        });
        this.LoginService = LoginService;
    }
}
exports.LoginController = LoginController;
