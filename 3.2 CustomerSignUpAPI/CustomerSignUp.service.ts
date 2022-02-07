import { User } from "../models/user";
import { CustomerSignUpRepository } from "./CustomerSignUp.repository";

export class CustomerSignUpService {
    public constructor(private readonly CustomerSignUpRepository: CustomerSignUpRepository) {
        this.CustomerSignUpRepository = CustomerSignUpRepository;
    }

    public async createCustomerSignUp(CustomerSignUp: {[key: number|string]:User}): Promise<User> {
        return this.CustomerSignUpRepository.createCustomerSignUp(CustomerSignUp);
    }

    public async getCustomerSignUpById(CustomerSignUpId: number): Promise<User | null> {
        return this.CustomerSignUpRepository.getCustomerSignUpById(CustomerSignUpId);
    }

    public async getAllCustomerSignUp(): Promise<User[]> {
        return this.CustomerSignUpRepository.getAllCustomerSignUp();
    }

    public async updateCustomerSignUp(CustomerSignUp: User, CustomerSignUpId: number): Promise<[number, User[]]> {
        return this.CustomerSignUpRepository.updateCustomerSignUp(CustomerSignUp, CustomerSignUpId);
    }

    public async deleteCustomerSignUp(CustomerSignUpId: number): Promise<number> {
        return this.CustomerSignUpRepository.deleteCustomerSignUp(CustomerSignUpId);
    }
}