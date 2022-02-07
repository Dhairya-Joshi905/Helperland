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
exports.SPSignUpController = void 0;
class SPSignUpController {
    constructor(SPSignUpService) {
        this.SPSignUpService = SPSignUpService;
        this.createSPSignUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.SPSignUpService
                .createSPSignUp(req.body)
                .then((SPSignUp) => {
                return res.status(200).json({ SPSignUp });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.getSPSignUpById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.SPSignUpService
                .getSPSignUpById(+req.params.id)
                .then((SPSignUp) => {
                if (SPSignUp) {
                    return res.status(200).json({ SPSignUp });
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.getAllSPSignUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.SPSignUpService
                .getAllSPSignUp()
                .then((SPSignUp) => {
                return res.status(200).json({ SPSignUp });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.updateSPSignUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.SPSignUpService
                .updateSPSignUp(req.body, +req.params.id)
                .then((SPSignUp) => {
                return res.status(200).json({ SPSignUp });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.deleteSPSignUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.SPSignUpService
                .deleteSPSignUp(+req.params.id)
                .then((SPSignUp) => {
                if (SPSignUp > 0) {
                    return res.status(200).json({ SPSignUp });
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.SPSignUpService = SPSignUpService;
    }
}
exports.SPSignUpController = SPSignUpController;
