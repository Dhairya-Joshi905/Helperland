import { User } from "../models/user";
import { SPSignUpRepository } from "./SPSignUp.repository";

export class SPSignUpService {
    public constructor(private readonly SPSignUpRepository: SPSignUpRepository) {
        this.SPSignUpRepository = SPSignUpRepository;
    }

    public async createSPSignUp(SPSignUp: {[key: number|string]:User}): Promise<User> {
        return this.SPSignUpRepository.createSPSignUp(SPSignUp);
    }

    public async getSPSignUpById(SPSignUpId: number): Promise<User | null> {
        return this.SPSignUpRepository.getSPSignUpById(SPSignUpId);
    }

    public async getAllSPSignUp(): Promise<User[]> {
        return this.SPSignUpRepository.getAllSPSignUp();
    }

    public async updateSPSignUp(SPSignUp: User, SPSignUpId: number): Promise<[number, User[]]> {
        return this.SPSignUpRepository.updateSPSignUp(SPSignUp, SPSignUpId);
    }

    public async deleteSPSignUp(SPSignUpId: number): Promise<number> {
        return this.SPSignUpRepository.deleteSPSignUp(SPSignUpId);
    }
}