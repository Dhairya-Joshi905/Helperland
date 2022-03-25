import {db} from "../../models/index"
import {Subscribe} from "../../models/subscribe"

export class SubscribeRepository {

    public async saveSubscriber (subscribe: { [key: number|string]: Subscribe }): Promise<Subscribe> {
        return db.Subscribe.create(subscribe);
    }

    public async getAllSubscribers(): Promise<Subscribe[]> {
        return db.Subscribe.findAll();
    }

    public async getSubscriberById (userId: number): Promise<Subscribe|null> {
        return db.Subscribe.findOne({ where: { id: userId } });
    }

    public async getSubscriberByEmail (Email:string): Promise<Subscribe|null> {
        return db.Subscribe.findOne({ where: { Email: Email } });
    }

    public async updateSubscriber (IsConfirmedSub: boolean, Email: string): Promise<[number, Subscribe[]]> {
        return db.Subscribe.update({ IsConfirmedSub: IsConfirmedSub }, { where: { Email: Email } });
    }
}