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
exports.SubscribeRepository = void 0;
const index_1 = require("../models/index");
class SubscribeRepository {
    saveSubscriber(Subscribe) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Subscribe.create(Subscribe);
        });
    }
    /*public async sendEmail(SubscriberId: number): Promise<Subscribe | null> {
        transporter.sendMail({
            to: 'dhairyajoshi.905@gmail.com'
        });
        return db.Subscribe.sendEmail({ where: {id: SubscriberId}});
    }

    public async sendEmailToAll(): Promise<ContactUs[]> {
        return db.Subscribe.findAll();
    }*/
    getSubscriberById(SubscriberId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Subscribe.findOne({ where: { id: SubscriberId } });
        });
    }
    getAllSubscribers() {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.db.Subscribe.findAll();
        });
    }
}
exports.SubscribeRepository = SubscribeRepository;
