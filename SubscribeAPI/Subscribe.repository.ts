import {db} from "../models/index";
import { Subscribe } from "../models/subscribe";
import { Request, Response } from 'express';
import { SubscribeService } from "./Subscribe.service";

export class SubscribeRepository {    
    public async saveSubscriber(Subscribe: Subscribe): Promise<Subscribe> {
        return db.Subscribe.create(Subscribe);
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

    public async getSubscriberById(SubscriberId: number): Promise<Subscribe | null> {
        return db.Subscribe.findOne({ where: {id: SubscriberId}});
    }

    public async getAllSubscribers(): Promise<Subscribe[]> {
        return db.Subscribe.findAll();
    }
}
