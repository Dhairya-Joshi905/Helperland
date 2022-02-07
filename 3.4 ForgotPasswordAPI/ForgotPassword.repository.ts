import {db} from "../models/index"
import {User} from "../models/user"


export class ForgotPasswordRepository{

    public async getUserByEmail (Email:string): Promise<User|null> {
        return db.User.findOne({ where: { Email: Email } });
    }

    public async getUserById (UserId: number): Promise<User|null> {
        return db.User.findOne({ where: { UserId: UserId } });
    }

    public async updateUserPassword (userPassword: string, UserId: number): Promise<[number, User[]]> {
        return db.User.update({ Password: userPassword }, { where: { UserId: UserId } });
    }
}