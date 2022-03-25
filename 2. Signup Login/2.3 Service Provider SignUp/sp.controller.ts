import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
import { Request, Response, RequestHandler } from "express";

import { User } from "../../models/user";
import { HelpersService } from "./sp.service";

require("dotenv").config();

const saltRounds = 10;
const UserTypeId: number = 3;

const mg = mailgun({
  apiKey: process.env.MAILGUN_API!,
  domain: process.env.MAILGUN_DOMAIN!,
});

export class HelpersController {
  public constructor (private readonly helpersService: HelpersService) {
    this.helpersService = helpersService;
  }

  public createHelper: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    req.body.UserTypeId = UserTypeId;
    req.body.IsRegisteredUser = false;
    const same = req.body.Password === req.body.ConfirmPassword;
    if (!same)
      return res.status(400).json({message: "Incorrect Password."});
    else
      return this.helpersService
        .getHelperByEmail(req.body.Email)
        .then((helper: User|null) => {
          if (helper)
            return res.status(400).json({message: "Email is already registered with us."});
          return this.helpersService
            .getHelperByMobile(req.body.Mobile)
            .then(async (helper: User|null) => {
              if (helper)
                return res.status(400).json({message: "Mobile number is already registered with us."});
              req.body.Password = await bcrypt.hash(req.body.Password, saltRounds);
              return this.helpersService
                .createHelper(req.body)
                .then((helper: User) => {
                  const token = this.helpersService.createToken(helper.Email!);
                  const data = this.helpersService.createEmailData(helper.Email!, token);
                  mg.messages().send(data, function (err, body) {
                    if (err)
                      return res.json({error: err.message});
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

  public activateAccount: RequestHandler = async (req: Request, res: Response): Promise<Response|undefined> => {
    const {token} = req.params;
    // 3
    console.log(token);
    if (token) {
      jwt.verify(token, process.env.JWT_ACC_ACTIVATE!, (error, decodedToken: any) => {
        // 1
        console.log(decodedToken);
        if (error)
          return res.status(400).json({error: "Incorrect or Expired link"});
        const {Email} = decodedToken;
        // undefined
        console.log(Email);
        if (Email)
          return this.helpersService
            .getHelperByEmail(Email)
            .then((helper: User|null) => {
              if (helper) {
                helper.IsRegisteredUser = true;
                return this.helpersService
                  .updateHelper(helper.IsRegisteredUser, helper.Email!)
                  .then((helper: [number, User[]]) => {
                    return res.status(200).json({message: "You are now successfully registered as service provider.", helper});
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
  }
}
