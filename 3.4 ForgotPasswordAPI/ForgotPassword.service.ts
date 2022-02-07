import { User } from "../models/user";
import { ForgotPasswordRepository } from "./ForgotPassword.repository";

import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

require("dotenv").config();

export class ForgotPasswordService {
  
  public constructor (private readonly ForgotPasswordRepository: ForgotPasswordRepository) {
    this.ForgotPasswordRepository = ForgotPasswordRepository;
  }

  public async getUserByEmail (userEmail: string): Promise<User|null> {
    return this.ForgotPasswordRepository.getUserByEmail(userEmail);
  }

  public async getUserById (userId: number): Promise<User|null> {
    return this.ForgotPasswordRepository.getUserById(userId);
  }

  public createData(Email:string, token:string): typeof data{
    const data = {
        from: 'teamhelperland@gmail.com',
        to: Email,
        subject: 'Password reset link',
        html: `<h1>Please click here to reset your password</h1>
              <a href="${process.env.CLIENT_URL}/resetpassword/${token}">Click here to change password.</a>`
    }
    return data;
  }

  public createToken (userId: number): string {
      const token = jwt.sign({ userId }, process.env.FORGOT_PASSWORD!, {expiresIn:'10m'});
      return token;
  }

  public async updateUserPassword (userPassword: string, userId: number): Promise<[number, User[]]> {
    return this.ForgotPasswordRepository.updateUserPassword(userPassword, userId);
  }

}