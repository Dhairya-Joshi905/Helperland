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
exports.SubscribeService = void 0;
class SubscribeService {
    constructor(SubscribeRepository) {
        this.SubscribeRepository = SubscribeRepository;
        this.SubscribeRepository = SubscribeRepository;
    }
    saveSubscriber(Subscribe) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.SubscribeRepository.saveSubscriber(Subscribe);
        });
    }
    /*public async sendEmail(SubscriberId: number): Promise<Subscribe | null> {
        return this.SubscribeRepository.sendEmail(SubscriberId);
    }

    public async sendEmailToAll(): Promise<> {
        return this.SubscribeRepository.sendEmailToAll();
    }*/
    getSubscriberById(SubscriberId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.SubscribeRepository.getSubscriberById(SubscriberId);
        });
    }
    getAllSubscribers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.SubscribeRepository.getAllSubscribers();
        });
    }
}
exports.SubscribeService = SubscribeService;
