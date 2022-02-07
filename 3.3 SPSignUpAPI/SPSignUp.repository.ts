import  {db} from "../models/index";
import { User } from "../models/user";

export class SPSignUpRepository {
    public async createSPSignUp(SPSignUp: {[key: number|string]: User}): Promise<User> {
        return db.User.create(SPSignUp);
    }
    
    public async getSPSignUpById(SPSignUpId: number): Promise<User | null> {
        return db.User.findOne({ where: {id: SPSignUpId}});
    }

    public async getAllSPSignUp(): Promise<User[]> {
        return db.User.findAll();
    }

    public async updateSPSignUp(SPSignUp: User, SPSignUpId: number): Promise<[number, User[]]> {
        return db.User.update(SPSignUp, { where: {id: SPSignUpId}});
    }

    public async deleteSPSignUp(SPSignUpId: number): Promise<number> {
        return db.User.destroy({ where: {id: SPSignUpId}});  
    }
    
}
