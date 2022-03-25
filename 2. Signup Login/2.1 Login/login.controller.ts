import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, RequestHandler } from "express";

import { User } from "../../models/user";
import { LoginService } from "./login.service";

require("dotenv").config();

export class LoginController {
  public constructor (private readonly loginService: LoginService) {
    this.loginService = loginService;
  }

  public checkLogin: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    return this.loginService
      .getUserByEmail(req.body.Email)
      .then(async (user: User|null) => {
        if (user) {
          const registered = this.loginService.isRegister(user);
          if (registered) {
            const isSame = await bcrypt.compare(req.body.Password, user.Password!);
            if (isSame) {
              const token = this.loginService.createToken(user.Email!);
              console.log(token);
              if (user.UserTypeId === 1)
                return res.status(200)
                  .cookie("token", token, {httpOnly: true, expires: new Date(Date.now()+600000)})
                  .json({message: "Super User login successful."});
              
              else if (user.UserTypeId === 2)
                return res.status(200)
                  .cookie("token", token, {httpOnly: true, expires: new Date(Date.now()+600000)})
                  .json({message: "Admin login successful."});
              
              else if (user.UserTypeId === 3)
                return res.status(200)
                  .cookie("token", token, {httpOnly: true, expires: new Date(Date.now()+600000)})
                  .json({message: "Service Provider login successful."});
              
              else
                return res.status(200)
                  .cookie("token", token, {httpOnly: true, expires: new Date(Date.now()+600000)})
                  .json({message: "User login successful."});
            }
            return res.status(401).json({message: "Login credentials incorrect."});
          }
          return res.json({message: "Activate your account."});
        }
        return res.status(401).json({message: "Invalid Username or Password"});
      })
      .catch((err: Error) => {
        console.log(err);
        return res.status(500).json({error: err});
      });
  };

  public validateToken: RequestHandler = async (req: Request, res: Response, next): Promise<Response|undefined> => {
    const token = req.headers.authorization;
    // console.log(token);
    if (token == null)
      return res.status(401).json({message: "Login credentials incorrect!"});
    // Here we are using any. Resolve that.
    jwt.verify(token, process.env.SECRET_KEY!, (err: jwt.VerifyErrors|null, user: any) => {
      if (err)
        return res.status(401).json({message:'Login credentials incorrect.'});
      else {
        req.body.email = user.userEmail;
        return this.loginService.getUserByEmail(user.userEmail)
        .then((user) => {
          if (user === null)
            return res.status(401).json({message: 'Unauthorized user.'});
          else {
            req.body.userId = user.UserId;
            req.body.userTypeId = user.UserTypeId;
            if (user.IsRegisteredUser === true) {
              next();
            }
            else
              return res.status(401).json({message:'Activate your account.'});
          }
        })
        .catch((err: Error) => {
          console.log(err);
          return res.status(500).json({error: err});
        });
      }
    });
  };

  public removeToken: RequestHandler = (req: Request, res: Response) => {
    try {
      res.clearCookie('token');
      return res.status(200).json({message:'You logged out.'})
    }
    catch (error) {
      return res.status(401).json({message:'Logout failed.'});
    }
  }
}
