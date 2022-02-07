import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../models/user";
import { ForgotPasswordService } from "./ForgotPassword.service";

import mailgun from "mailgun-js";
import { json } from "sequelize";

require("dotenv").config();

const DOMAIN: string = process.env.MAILGUN_DOMAIN!;
const mgun = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: DOMAIN,
});

const salt: number = 10;

export class ForgotPasswordController {
  
  public constructor (private readonly ForgotPasswordService: ForgotPasswordService) {
    this.ForgotPasswordService = ForgotPasswordService;
  }

  public forgotPassword: RequestHandler = async (req, res): Promise<Response> => {
    
    const Email: string = req.body.Email;
    
    if (Email) {
      
      return this.ForgotPasswordService
        .getUserByEmail(Email)
        .then((user) => {
          if (!user)
            return res.status(400).json({ message: "No user found" });
          
          const resetLink = this.ForgotPasswordService.createToken(user.UserId);
          const data = this.ForgotPasswordService.createData(user.Email!, resetLink);
          
          // Change this any type
          mgun.messages().send(data, function (err: Error, body: any) {
            if (err)
              return res.json({ error: err.message });
          });
          
          return res.status(200).json({ message: "Email sent" });
        
        })
        
        .catch((error: Error) => {
          console.log(error);
          return res.status(500).json(error);
        });
    }
    
    else  return res.status(400).json({ message: "Invalid Email" });
    
  };

  public resetPassword: RequestHandler = async (req, res): Promise<Response | undefined> => {
    
    const resetLink: string = req.body.resetLink;
    
    if (resetLink) {
      
      jwt.verify (resetLink, process.env.FORGOT_PASSWORD!, (error, decodedlink: any) => {
          if (error) {
            return res.status(401).json({ message: "Token not valid" });
          }
          
          const userId: number = decodedlink.userId;
          
          return this.ForgotPasswordService
            .getUserById(userId)
            .then(async (user) => {
              
              if (!user)
                return res.status(400).json({ error: "User does not exist" });
              
              const oldPassword = await bcrypt.compare(
                req.body.newPassword,
                user.Password!
              );
              
              if (oldPassword)
                return res.status(200).json({message: "Old Password. Choose a fresh one." });
               
              else {  
                user.Password = await bcrypt.hash(req.body.newPassword, salt);
                
                return this.ForgotPasswordService
                  .updateUserPassword(user.Password, user.UserId)
                  .then((user) => {
                    return res.status(200).json({ message: "password changed", user });
                  })
                  .catch((err: Error) => {
                    console.log(err);
                    return res.status(500).json(err);
                  });
              }
            })
            
            .catch((err: Error) => {
              console.log(err);
              return res.status(500).json(err);
            });
        }
      );
    }
    
    else
      return res.status(400).json({ message: "some client side error" });
  };
}