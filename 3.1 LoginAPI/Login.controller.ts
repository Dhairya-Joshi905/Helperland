import { User } from "../models/user";
import { LoginService } from "./Login.service";
import { Request, Response, RequestHandler } from "express";

import bcrypt from "bcrypt";

require("dotenv").config();

export class LoginController {
  
  public constructor (private readonly LoginService: LoginService) {
    this.LoginService = LoginService;
  }

  public Login: RequestHandler = async (req,res): Promise<Response> => {
    
    return this.LoginService
      .getUserByEmail(req.body.Email)
      .then(async (User: User | null) => {
        
        if (User) {
          
          const registered = this.LoginService.IsRegistered(User);
          
          if (registered) {
            
            const ok = await bcrypt.compare(
              req.body.Password,
              User.Password!
            );
            
            if (ok) {
              const token = this.LoginService.createToken(User.Email!);
              
              if (User.RoleId === 1) 
                return res.status(200).json({ message: "user login successful" });
              
              else if (User.RoleId === 2) 
                return res.status(200).json({ message: "service provider login successful" });
              
              else 
                return res.status(200).json({ message: "admin login successful" });
            }
            
            return res.status(401).json({ message: "Invalid Username or Password" });
          
          }
        
          return res.status(401).json({ message: "Invalid Username or Password" });

        }
        
        return res.status(401).json({ message: "Invalid Username or Password" });

      })
      
      .catch((err: Error) => {
        console.log(err);
        return res.status(500).json({
          err: err,
        });
      });
  };
}