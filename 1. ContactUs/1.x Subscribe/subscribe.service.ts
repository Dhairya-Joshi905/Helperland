import jwt from "jsonwebtoken";

import { SubscribeRepository } from "./subscribe.repository";

import { Subscribe } from "../../models/subscribe";

export class SubscribeService {
    public constructor (private readonly subUserRepository: SubscribeRepository) {
        this.subUserRepository = subUserRepository;
    }

    public async saveSubscriber (subUser: { [key: number | string]: Subscribe }): Promise<Subscribe> {
        return this.subUserRepository.saveSubscriber(subUser);
    }

    public async getAllSubscribers(): Promise<Subscribe[]> {
        return this.subUserRepository.getAllSubscribers();
    }

    public async getSubscriberById (subUserId:number): Promise<Subscribe|null> {
        return this.subUserRepository.getSubscriberById(subUserId);    
    }

    public async getSubscriberByEmail (subUserEmail:string): Promise<Subscribe|null> {
        return this.subUserRepository.getSubscriberByEmail(subUserEmail);    
    }

    public createEmailData (userEmail: string, token: string): typeof data {
        const data = {
            from: 'teamhelperland@gmail.com',
            to: userEmail,
            subject: 'Helperland newsletter subscription',
            html: `<html>
                    <body>
                        <h2>Click below to subscribe us.</h2>
                        <a href="${process.env.CLIENT_URL}/ContactUs/subscriber/activate/${token}">Click here</a>
                    </body>
                </html>`
        }
        return data;
    }

    public createEmailDataForAll (Email: string): typeof data {
        const data = {
            from: 'teamhelperland@gmail.com',
            to: Email,
            subject: 'Hello',
            html: `<h1>You are subscribed to our mailing list.</h1>`
        }
        return data;
    }

    public createToken (Email: string): string {
        const token = jwt.sign({ Email }, process.env.JWT_ACC_ACTIVATE!, {expiresIn:'1h'});
        return token;
    }

    public async updateSubscriber (IsConfirmedSub: boolean, Email: string): Promise<[number, Subscribe[]]> {
        return this.subUserRepository.updateSubscriber(IsConfirmedSub, Email);
    }
}