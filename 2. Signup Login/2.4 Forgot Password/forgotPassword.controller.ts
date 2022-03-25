import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
import { Request, Response, RequestHandler } from "express";

import { User } from "../../models/user";
import { ResetService } from "./forgotPassword.service";

require("dotenv").config();

const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: process.env.MAILGUN_DOMAIN!,
});

const saltRounds: number = 10;

export class ResetController {
  public constructor(private readonly resetService: ResetService) {
    this.resetService = resetService;
  }

  public forgotPassword: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    const Email: string = req.body.Email;
    if (Email) {
      return this.resetService
        .getUserByEmail(Email)
        .then((user: User|null) => {
          if (!user)
            return res.status(400).json({message: "User with this email is not in our database." });
          const resetLink = this.resetService.createToken(user.UserId);
          const data = this.resetService.createData(user.Email!, resetLink);
          mg.messages().send(data, function (err, body) {
            if (err)
              return res.json({error: err.message});
          });
          return res.status(200).json({message: "Email sent for resetting password."});
        })
        .catch((err: Error) => {
          console.log(err);
          return res.status(500).json(err);
        });
    }
    else
      return res.status(400).json({message: "Email does not exist"});
  };

  public resetPassword: RequestHandler = async (req: Request, res: Response): Promise<Response|undefined> => {
    const resetLink: string = req.body.resetLink;
    if (resetLink) {
      jwt.verify(resetLink, process.env.FORGOT_PASSWORD!, (error, decodedlink: any) => {
        if (error)
          return res.status(401).json({message: "Token is false or expired."});
        const userId: number = decodedlink.userId;
        return this.resetService
          .getUserById(userId)
          .then(async (user: User|null) => {
            if (!user)
              // 404?
              return res.status(404).json({error: "User with this token does not exist."});
            const Same = await bcrypt.compare(req.body.newPassword, user.Password!);
            if (Same)
              return res.status(200).json({message: "This is the same old password. Create a new fresh one."});
            else {
              user.Password = await bcrypt.hash(req.body.newPassword, saltRounds);
              return this.resetService
                .updateUser(user.Password, user.UserId)
                .then((user: [number, User[]]) => {
                  return res.status(200).json({message: "Password changed successfully.", user});
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
      });
    }
    else
      return res.status(400).json({message: "Something went wrong!!"});
  };
}
