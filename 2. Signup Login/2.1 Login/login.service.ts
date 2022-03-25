import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import { User } from "../../models/user";
import { LoginRepository } from "./login.repository";

export class LoginService {
  public constructor (private readonly loginRepository: LoginRepository) {
    this.loginRepository = loginRepository;
  }

  public async getUserByEmail (userEmail: string): Promise<User|null> {
    return this.loginRepository.getUserByEmail(userEmail);
  }

  public isRegister (user: User) {
    return user.IsRegisteredUser;
  }

  public async comparePassword (loginPassword: string, Password: string): Promise<boolean> {
    const same = await bcrypt.compare (loginPassword, Password);
    return same;
  }

  public createToken (userEmail: string): string {
    const token = jwt.sign({userEmail}, process.env.SECRET_KEY!, {expiresIn:'6h'});
    return token;
  }
}
