import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
import { Request, Response, RequestHandler } from "express";

import { User } from "../../models/user";
import { UsersService } from "./customer.service";

require("dotenv").config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: process.env.MAILGUN_DOMAIN!,
});

const saltRounds: number = 10;
// For normal users
const UserTypeId: number = 4;

export class UsersController {
  public constructor (private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

  public createUsers: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    req.body.UserTypeId = UserTypeId;
    req.body.IsRegisteredUser = false;
    const same = req.body.Password === req.body.ConfirmPassword;
    if (!same)
      return res.status(400).json({message: "Password does not match "});
    else
      return this.usersService
        .getUserByEmail(req.body.Email)
        .then((user: User|null) => {
          if (user)
            return res.status(400).json({message: "Email already registered"});
          return this.usersService
            .getUserByMobile(req.body.Mobile)
            .then(async (user: User|null) => {
              if (user)
                return res.status(400).json({message: "Mobile number is already registered with us." });
              req.body.Password = await bcrypt.hash(req.body.Password, saltRounds);
              return this.usersService
                .createUsers(req.body)
                .then((user: User) => {
                  const token = this.usersService.createToken(user.Email!);
                  const data = this.usersService.createData(user.Email!, token);
                  // console.log(token);
                  // console.log(data);
                  mg.messages().send(data, function (err, body) {
                    if (err)
                      return res.status(500).json({error: err.message});
                  });
                  return res.status(200).json({message: "Email sent. Now activate your account."});
                })
                .catch((err: Error) => {
                  console.log(err);
                  return res.status(500).json({error: err});
                });
            })
            .catch((err: Error) => {
              console.log(err);
              return res.status(500).json(err);
            });
        })
        .catch((err: Error) => {
          console.log(err);
          return res.status(500).json(err);
        });
  };

  // public activateAccount: RequestHandler = async (req: Request, res: Response): Promise<Response|undefined> => {
  //   const {token} = req.params;
  //   if (token) {
  //     jwt.verify(token, process.env.JWT_ACC_ACTIVATE!, (error, decodedToken: any) => {
  //       if (error)
  //         return res.status(400).json({error: "Incorrect or Expired link."});
  //       const {userEmail} = decodedToken;
  //       if (userEmail)
  //         return this.usersService
  //           .getUserByEmail(userEmail)
  //           .then((user: User|null) => {
  //             if (user) {
  //               user.IsRegisteredUser = true;
  //               return this.usersService
  //                 .updateUser(user.IsRegisteredUser, user.Email!)
  //                 .then((user: [number, User[]]) => {
  //                   return res.status(200).json({message: "User is now registered.", user});
  //                 })
  //                 .catch((err: Error) => {
  //                   console.log(err);
  //                   return res.status(500).json(err);
  //                 });
  //             }
  //           })
  //           .catch((err: Error) => {
  //             console.log(err);
  //             return res.status(500).json(err);
  //           });
  //     });
  //   }
  //   else
  //     return res.json({error: "Something went wrong!!"});
  // };

  public activateAccount: RequestHandler = async (req: Request, res: Response): Promise<Response|undefined> => {
    const {token} = req.params;
    // 3
    console.log(token);
    if (token) {
      jwt.verify(token, process.env.JWT_ACC_ACTIVATE!, (error, decodedToken: any) => {
        // 1
        // console.log(decodedToken);
        if (error)
          return res.status(400).json({error: "Incorrect or Expired link"});
        const {Email} = decodedToken;
        // undefined
        // console.log(Email);
        if (Email)
          return this.usersService
            .getUserByEmail(Email)
            .then((user: User|null) => {
              if (user) {
                user.IsRegisteredUser = true;
                return this.usersService
                  .updateUser(user.IsRegisteredUser, user.Email!)
                  .then((user: [number, User[]]) => {
                    return res.status(200).json({message: "You are now successfully registered as customer.", user});
                  })
                  .catch((err: Error) => {
                    console.log(err);
                    return res.status(500).json(err);
                  });
              }
              return res.json({error: "Something went wrong!"});
            })
            .catch((err: Error) => {
              console.log(err);
              return res.status(500).json(err);
            });
        return res.json({error: "Something went wrong!!"});
      });
    }
    else
      return res.json({ error: "Something went wrong!!!" });
  };
}
