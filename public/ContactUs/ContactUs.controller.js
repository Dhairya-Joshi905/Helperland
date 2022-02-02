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
exports.ContactUsController = void 0;
class ContactUsController {
    constructor(ContactUsService) {
        this.ContactUsService = ContactUsService;
        this.getAllContactUs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.ContactUsService
                .getAllContactUs()
                .then((ContactUs) => {
                return res.status(200).json({ ContactUs });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.createContactUs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.ContactUsService
                .createContactUs(req.body)
                .then((ContactUs) => {
                return res.status(200).json({ ContactUs });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.getContactUsById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.ContactUsService
                .getContactUsById(+req.params.id)
                .then((ContactUs) => {
                if (ContactUs) {
                    return res.status(200).json({ ContactUs });
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.updateContactUs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.ContactUsService
                .updateContactUs(req.body, +req.params.id)
                .then((ContactUs) => {
                return res.status(200).json({ ContactUs });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.deleteContactUs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return this.ContactUsService
                .deleteContactUs(+req.params.id)
                .then((ContactUs) => {
                if (ContactUs > 0) {
                    return res.status(200).json({ ContactUs });
                }
                return res.status(404).json({ error: 'NotFound' });
            })
                .catch((error) => {
                return res.status(500).json({
                    error: error
                });
            });
        });
        this.ContactUsService = ContactUsService;
    }
}
exports.ContactUsController = ContactUsController;
