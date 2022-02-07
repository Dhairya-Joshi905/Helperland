import { User } from "../models/user";
import { LoginRepository } from "./Login.repository";

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export class LoginService {
  
  public constructor (private readonly LoginRepository: LoginRepository) {
    this.LoginRepository = LoginRepository;
  }

  public async getUserByEmail (userEmail: string): Promise<User | null> {
    return this.LoginRepository.getUserByEmail(userEmail);
  }

  public IsRegistered (User: User){
    return User.IsRegisteredUser; 
  }

  public async checkPassword (LoginPassword: string, Password: string): Promise<boolean> {
    const same = await bcrypt.compare(LoginPassword, Password);
    return same;
  }

  public createToken (Email: string): string {
    const token = jwt.sign({ Email }, process.env.KEY!, { expiresIn:'1h' });
    return token;
  }
}