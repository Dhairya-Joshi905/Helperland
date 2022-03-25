import jwt from "jsonwebtoken";

import { User } from "../../models/user";
import { HelpersRepository } from "./sp.repository";

require('dotenv').config();

export class HelpersService {
    public constructor (private readonly helpersRepository: HelpersRepository) {
        this.helpersRepository = helpersRepository;
    }

    public async createHelper (users: {[key: number|string]: User}): Promise<User> {
        return this.helpersRepository.createHelper(users);
    }

    public async getHelperByEmail (Email: string): Promise<User|null> {
        return this.helpersRepository.getHelperByEmail(Email);
    }

    public async getHelperByMobile (Mobile: string): Promise<User|null> {
        return this.helpersRepository.getHelperByMobile(Mobile);
    }

    public async updateHelper (IsHelperRegistered: boolean, Email: string): Promise<[number, User[]]> {
        return this.helpersRepository.updateHelper(IsHelperRegistered, Email);
    }
    
    // Why not async here?
    public createEmailData (Email: string, token: string): typeof data {
        const data = {
            from: 'teamhelperland@gmail.com',
            to: Email,
            subject: 'Activate service provider account',
            html: `<h1>Click here to activate you account</h1>
                  <a href="${process.env.CLIENT_URL}/SignUp&Login/activate/ServiceProvider/${token}">Click here</a>`
        }
        return data;
    }

    public createToken (Email: string): string {
        const token = jwt.sign({Email}, process.env.JWT_ACC_ACTIVATE!, {expiresIn:'4h'});
        return token;
    }
}