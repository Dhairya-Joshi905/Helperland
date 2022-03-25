import jwt from "jsonwebtoken";

import { User } from "../../models/user";
import { ResetRepository } from "./forgotPassword.repository";

require("dotenv").config();

export class ResetService {
  public constructor (private readonly resetRepository: ResetRepository) {
    this.resetRepository = resetRepository;
  }

  public async getUserByEmail (userEmail: string): Promise<User|null> {
    return this.resetRepository.getUserByEmail(userEmail);
  }

  public async getUserById (userId: number): Promise<User|null> {
    return this.resetRepository.getUserById(userId);
  }

  public async updateUser (Password: string, userId: number): Promise<[number, User[]]> {
    return this.resetRepository.updateUser(Password, userId);
  }

  public createData (Email: string, token: string): typeof data {
    const data = {
      from: 'teamhelperland@gmail.com',
      to: Email,
      subject: 'Forgot Password link',
      html: `<h2>Click below</h2>
            <a href="${process.env.CLIENT_URL}/SignUp&Login/ForgotPassword/${token}">Click here</a>`
    }
    return data;
  }

  public createToken (userId: number): string {
    const token = jwt.sign({userId}, process.env.FORGOT_PASSWORD!, {expiresIn:'30m'});
    return token;
  }
}