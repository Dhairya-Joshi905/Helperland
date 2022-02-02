import { Subscribe } from "../models/subscribe";
import { SubscribeRepository } from "./Subscribe.repository";

export class SubscribeService {
    public constructor(private readonly SubscribeRepository: SubscribeRepository) {
        this.SubscribeRepository = SubscribeRepository;
    }

    public async saveSubscriber(Subscribe: Subscribe): Promise<Subscribe> {
        return this.SubscribeRepository.saveSubscriber(Subscribe);
    }

    /*public async sendEmail(SubscriberId: number): Promise<Subscribe | null> {
        return this.SubscribeRepository.sendEmail(SubscriberId);
    }

    public async sendEmailToAll(): Promise<> {
        return this.SubscribeRepository.sendEmailToAll();
    }*/

    public async getSubscriberById(SubscriberId: number): Promise<Subscribe | null> {
        return this.SubscribeRepository.getSubscriberById(SubscriberId);
    }

    public async getAllSubscribers(): Promise<Subscribe[]> {
        return this.SubscribeRepository.getAllSubscribers();
    }
}