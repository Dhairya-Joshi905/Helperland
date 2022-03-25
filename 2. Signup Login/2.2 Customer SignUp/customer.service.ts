import jwt from "jsonwebtoken";

import { User } from "../../models/user";
import { UsersRepository } from "./customer.repository";

require('dotenv').config();

export class UsersService{
    public constructor(private readonly usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }
    
    public async createUsers (users: {[key: number|string]: User}): Promise<User> {
        return this.usersRepository.createUsers(users);
    }
    
    public async getUserByEmail (userEmail: string): Promise<User|null> {
        return this.usersRepository.getUserByEmail(userEmail);
    }
    
    public async getUserByMobile (userMobile:string): Promise<User|null> {
        return this.usersRepository.getUserByMobile(userMobile);
    }
    
    public async updateUser (userIsregistered: boolean, userEmail: string): Promise<[number, User[]]> {
        return this.usersRepository.updateUser(userIsregistered, userEmail);
    }

    public createData (Email: string, token: string): typeof data {
        // console.log(Email);
        const data = {
            from: 'teamhelperland@gmail.com',
            to: Email,
            subject: 'Activate customer account',
            html: `<h2>Click here to activate you account</h2>
                  <a href="${process.env.CLIENT_URL}/SignUp&Login/activate/Customer/${token}">Click here</a>`
        }
        return data;
    }

    public createToken (Email: string): string {
        const token = jwt.sign({Email}, process.env.JWT_ACC_ACTIVATE!, {expiresIn:'4h'});
        return token;
    }
}