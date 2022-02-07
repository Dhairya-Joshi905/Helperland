import  {db} from "../models/index";
import { User } from "../models/user";

export class CustomerSignUpRepository {
    public async createCustomerSignUp(CustomerSignUp: {[key: number|string]: User}): Promise<User> {
        return db.User.create(CustomerSignUp);
    }
    
    public async getCustomerSignUpById(CustomerSignUpId: number): Promise<User | null> {
        return db.User.findOne({ where: {id: CustomerSignUpId}});
    }

    public async getAllCustomerSignUp(): Promise<User[]> {
        return db.User.findAll();
    }

    public async updateCustomerSignUp(CustomerSignUp: User, CustomerSignUpId: number): Promise<[number, User[]]> {
        return db.User.update(CustomerSignUp, { where: {id: CustomerSignUpId}});
    }

    public async deleteCustomerSignUp(CustomerSignUpId: number): Promise<number> {
        return db.User.destroy({ where: {id: CustomerSignUpId}});  
    }
    
}
