import jwt from "jsonwebtoken";
import { Request, Response, RequestHandler } from "express";

import { UsersService } from "./contactus.service";

import { ContactUs } from "../../models/contactus";
import { User } from "../../models/user";

require("dotenv").config();

export class UsersController {
  public constructor(private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

  public getUsers: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    return this.usersService
      .getUsers()
      .then((user: ContactUs[]) => {
        return res.status(200).json({user});
      })
      .catch((err: Error) => {
        return res.status(500).json({error: err});
      });
  };

  public createUsers: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    req.body.UploadFileName = req.file?.originalname;
    req.body.FilePath = req.file?.path;
    return this.usersService
      .createUsers(req.body)
      .then((user: ContactUs) => {
        return res.status(200).json({ user });
      })
      .catch((err: Error) => {
        console.log(err);
        return res.status(500).json({ error: err });
      });
  };

  public getUserById: RequestHandler = async (req: Request, res: Response): Promise<Response> => {
    return this.usersService
      .getUserById(+req.params.id)
      .then((user: ContactUs|null) => {
        if (user)
          return res.status(200).json({ user });
        return res.status(404).json({error: "User with this UserId not found."});
      })
      .catch((err: Error) => {
        return res.status(500).json({error: err});
      });
  };

  public authenticate: RequestHandler = async (req: Request, res: Response, next): Promise<Response|void> => {
    // What is this auth?
    const token = req.headers.authorization! || req.header('auth');
    return this.usersService
      .getUserByEmail(req.body.Email)
      .then((user: User | null) => {
        if (user) {
          if (token)
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
              if (error)
                return res.status(303).json({ message: "JWT verification failed. Invalid Credentials." });
              else
                return this.usersService
                  .getUserByEmail(user.userEmail)
                  .then((user: User | null) => {
                    if (user === null)
                      return res.status(401).json({ message: "user not found" });
                    req.body.CreatedBy = user.UserId;
                    next();
                  })
                  .catch((err: Error) => {
                    return res.status(500).json({ error: err });
                  });
            });
          else
            return res.status(401).json({ message: "You are registered user. Login and then Contact Us" });
        } 
        else  next();
      })
      .catch((err: Error) => {
        return res.status(500).json({error: err});
      });
  };
}
