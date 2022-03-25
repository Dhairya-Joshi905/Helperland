import {db} from "../../models/index"
import {User} from "../../models/user"

export class HelpersRepository{

    public async createHelper(users: {[key: number|string]: User}): Promise<User> {
        return db.User.create(users);
    }

    public async getHelperByEmail(Email: string): Promise<User|null> {
        return db.User.findOne({where: {Email: Email}}); 
    }
    public async getHelperByMobile (Mobile: string): Promise<User|null> {
        return db.User.findOne({where: {Mobile: Mobile}}); 
    }

    public async updateHelper(IsHelperRegistered: boolean, Email: string): Promise<[number, User[]]> {
        return db.User.update({IsRegisteredUser: IsHelperRegistered}, {where: {Email: Email}});
    }

    // Create Delete Helper
    // Get Helper by Id 
    // Get all helpers
}