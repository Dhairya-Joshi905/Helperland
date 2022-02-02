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
exports.ContactUsService = void 0;
class ContactUsService {
    constructor(ContactUsRepository) {
        this.ContactUsRepository = ContactUsRepository;
        this.ContactUsRepository = ContactUsRepository;
    }
    createContactUs(ContactUs) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ContactUsRepository.createContactUs(ContactUs);
        });
    }
    getContactUsById(ContactUsId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ContactUsRepository.getContactUsById(ContactUsId);
        });
    }
    getAllContactUs() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ContactUsRepository.getAllContactUs();
        });
    }
    updateContactUs(ContactUs, ContactUsId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ContactUsRepository.updateContactUs(ContactUs, ContactUsId);
        });
    }
    deleteContactUs(ContactUsId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ContactUsRepository.deleteContactUs(ContactUsId);
        });
    }
}
exports.ContactUsService = ContactUsService;
